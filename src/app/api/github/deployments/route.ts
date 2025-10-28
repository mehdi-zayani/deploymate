import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// Fetch latest workflow runs from user's repositories
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Step 1: Fetch user's repositories
    const reposRes = await fetch("https://api.github.com/user/repos?per_page=5", {
      headers: {
        Authorization: `token ${session.accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!reposRes.ok) {
      return NextResponse.json({ error: "Failed to fetch repositories" }, { status: reposRes.status });
    }

    const repos = await reposRes.json();

    // Step 2: Fetch workflow runs for each repo
    const runsData = await Promise.all(
      repos.map(async (repo: any) => {
        const runsRes = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/actions/runs?per_page=1`,
          {
            headers: {
              Authorization: `token ${session.accessToken}`,
              Accept: "application/vnd.github+json",
            },
          }
        );

        if (!runsRes.ok) return null;
        const runs = await runsRes.json();

        if (runs.total_count === 0) return null;

        const run = runs.workflow_runs[0];
        return {
          id: run.id,
          repo: repo.name,
          workflow_name: run.name || "Unnamed Workflow",
          status: run.conclusion || run.status,
          branch: run.head_branch,
          updated_at: run.updated_at,
          html_url: run.html_url,
        };
      })
    );

    // Filter null entries
    const filteredRuns = runsData.filter(Boolean);
    return NextResponse.json(filteredRuns);
  } catch (error) {
    console.error("Error fetching GitHub deployments:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

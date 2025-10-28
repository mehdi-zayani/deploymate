import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/options"; 

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !(session as any).accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch("https://api.github.com/user/repos?per_page=10", {
    headers: {
      Authorization: `token ${(session as any).accessToken}`,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch repos", status: response.status },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}

import "../styles/globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";

export const metadata = {
  title: "DeployMate",
  description: "Simple CI/CD dashboard with GitHub integration",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

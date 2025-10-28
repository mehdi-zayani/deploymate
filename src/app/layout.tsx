import "../styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "DeployMate",
  description: "Automate and visualize your Git CI/CD workflows easily.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}

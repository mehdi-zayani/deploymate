import Image from "next/image";

export default function HomePage() {
  return (

    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <Image src="/logo.svg" alt="DeployMate Logo" width={80} height={80} className="mb-4" />
      <h1 className="text-4xl font-bold text-violet-600">DeployMate</h1>
      <p className="text-neutral-600 dark:text-neutral-300 mt-2">Streamline your deployments with ease.</p>
    </main>
    
  );
}

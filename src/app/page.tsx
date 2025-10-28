import Image from "next/image";

export default function Home() {
  return (
    <main className="text-center p-10">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/logo.svg" // change name to adapt to file
          alt="DeployMate Logo"
          width={100}
          height={100}
          priority
          className="drop-shadow-md"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-primary mb-4">
         DeployMate
      </h1>

      {/* Sub-title */}
      <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
        Simplify and visualize your CI/CD pipelines — effortlessly.
      </p>

      {/* Button */}
      <button className="mt-6 px-6 py-3 bg-primary text-white rounded-xl shadow-md hover:bg-primary-dark transition">
        Get Started
      </button>
    </main>
  );
}

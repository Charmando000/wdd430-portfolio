"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Projects page error:", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900">
        Something went wrong
      </h1>
      <p className="mt-3 text-gray-600">
        We could not load this page. Please try again.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-blue-700 px-5 py-2 font-medium text-white hover:bg-blue-800"
        >
          Try again
        </button>
        <Link
          href="/projects"
          className="rounded-md border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-100"
        >
          Back to projects
        </Link>
      </div>
    </main>
  );
}

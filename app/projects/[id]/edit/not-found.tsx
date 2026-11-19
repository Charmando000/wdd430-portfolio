import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900">
        Project not found
      </h1>
      <p className="mt-3 text-gray-600">
        The project you are trying to edit does not exist.
      </p>
      <Link
        href="/projects"
        className="mt-6 inline-block rounded-md bg-blue-700 px-5 py-2 font-medium text-white hover:bg-blue-800"
      >
        Back to projects
      </Link>
    </main>
  );
}

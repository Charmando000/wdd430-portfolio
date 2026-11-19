import Link from "next/link";
import ProjectForm from "@/components/ProjectForm";

export default function CreateProjectPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/projects" className="text-blue-600 hover:underline">
        ← Back to projects
      </Link>
      <h1 className="mt-5 text-gray-900">Create a Project</h1>
      <p className="mt-2 text-gray-600">
        Add a new project to your portfolio.
      </p>
      <ProjectForm />
    </main>
  );
}

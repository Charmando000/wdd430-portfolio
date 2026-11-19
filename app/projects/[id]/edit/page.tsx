import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { getProjectById } from "@/lib/projects-db";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

async function EditProjectContent({ params }: EditProjectPageProps) {
  const { id } = await params;
  const projectId = Number(id);

  if (!Number.isSafeInteger(projectId) || projectId < 1) {
    notFound();
  }

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/projects" className="text-blue-600 hover:underline">
        ← Back to projects
      </Link>
      <h1 className="mt-5 text-gray-900">Edit Project</h1>
      <p className="mt-2 text-gray-600">
        Update the information for {project.title}.
      </p>
      <ProjectForm project={project} />
    </main>
  );
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  return (
    <Suspense fallback={<p className="mx-auto max-w-3xl px-4 py-12">Loading project...</p>}>
      <EditProjectContent params={params} />
    </Suspense>
  );
}

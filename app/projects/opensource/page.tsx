import { Suspense } from "react";
import { getProjects } from "@/lib/projects-db";
import ProjectCard from "@/components/ProjectCard";

async function OpenSourceContent() {
  const projects = await getProjects("opensource");

  return projects.length === 0 ? (
    <p className="mt-4 text-gray-300">No open source projects found.</p>
  ) : (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default function OpenSourcePage() {
  return (
    <main className="py-8">
      <h1 className="text-gray-100">Open Source Projects</h1>
      <Suspense fallback={<p className="mt-4 text-gray-300">Loading projects...</p>}>
        <OpenSourceContent />
      </Suspense>
    </main>
  );
}

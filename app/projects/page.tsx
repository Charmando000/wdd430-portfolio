import { Suspense } from "react";
import Link from "next/link";
import { getPaginatedProjects } from "@/lib/projects-db";
import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/ProjectCard";

interface ProjectsPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

async function ProjectsContent({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;
  const search = params.search ?? "";
  const page = Math.max(1, Number(params.page) || 1);

  const result = await getPaginatedProjects(search, page);

  return (
    <>
      <ProjectSearch />

      <div className="mt-6">
        <p className="mb-4 text-gray-600">
          Found {result.total} projects.
        </p>

        {result.projects.length === 0 ? (
          <p className="text-gray-600">No projects found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {result.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        <Pagination
          totalPages={result.totalPages}
          currentPage={result.currentPage}
        />
      </div>
    </>
  );
}

export default function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-gray-100">Projects Overview</h1>
        <Link
          href="/projects/create"
          className="rounded-md bg-blue-700 px-5 py-2 font-medium text-white hover:bg-blue-800"
        >
          + Create Project
        </Link>
      </div>

      <Suspense fallback={<p>Loading projects...</p>}>
        <ProjectsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

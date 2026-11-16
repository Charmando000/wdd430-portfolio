import { Suspense } from "react";
import { getPaginatedProjects } from "@/lib/projects-db";
import ProjectSearch from "@/components/ProjectSearch";
import Pagination from "@/components/Pagination";

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
              <article
                key={project.id}
                className="rounded-lg bg-white p-6 shadow"
              >
                <h2 className="text-2xl font-semibold text-gray-900">
                  {project.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  {project.description}
                </p>

                <p className="mt-3 text-sm">
                  <strong>Technologies:</strong>{" "}
                  {project.technologies.join(", ")}
                </p>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-blue-600 hover:underline"
                  >
                    View Project
                  </a>
                )}
              </article>
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
      <h1 className="text-gray-900">Projects Overview</h1>

      <Suspense fallback={<p>Loading projects...</p>}>
        <ProjectsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}


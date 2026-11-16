
import { Suspense } from "react";
import { getProjects } from "@/lib/projects-db";

async function SchoolContent() {
  const projects = await getProjects("school");

  return (
    <>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-lg bg-gray-800 p-6 shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-100">
              {project.title}
            </h2>

            <p className="mt-2 text-gray-300">
              {project.description}
            </p>

            <p className="mt-3 text-sm text-gray-300">
              Technologies: {project.technologies.join(", ")}
            </p>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-400 hover:underline"
              >
                View Project
              </a>
            )}
          </article>
        ))}
      </div>
    </>
  );
}

export default function SchoolProjectsPage() {
  return (
    <main className="py-8">
      <h1 className="text-gray-100">School Projects</h1>
        <Suspense
          fallback={
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-lg bg-gray-800 p-6 shadow"
                >
                  <div className="h-7 w-3/4 rounded bg-gray-600" />

                  <div className="mt-4 h-4 w-full rounded bg-gray-700" />
                  <div className="mt-2 h-4 w-5/6 rounded bg-gray-700" />

                  <div className="mt-5 h-4 w-2/3 rounded bg-gray-700" />
                </div>
              ))}
            </div>
          }
        >
          <SchoolContent />
        </Suspense>

    </main>
  );
}

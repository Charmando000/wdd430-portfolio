
import { getProjects } from "@/lib/projects-db";

export default async function OpenSourcePage() {
  const projects = await getProjects("opensource");

  return (
    <main className="py-8">
      <h1 className="text-gray-100">Open Source Projects</h1>

      {projects.length === 0 && (
        <p className="mt-4 text-gray-300">
          No open source projects found.
        </p>
      )}

      {projects.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
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

              <p className="mt-3 text-sm text-gray-700">
                Technologies: {project.technologies.join(", ")}
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
    </main>
  );
}

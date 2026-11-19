import Link from "next/link";
import { deleteProject } from "@/app/projects/actions";
import type { Project } from "@/lib/projects-db";

type ProjectCardProps =
  | { project: Project }
  | {
      title: string;
      description: string;
      technologies: string[];
      link?: string;
    };

export default function ProjectCard(props: ProjectCardProps) {
  const project = "project" in props ? props.project : undefined;
  const title = project?.title ?? ("title" in props ? props.title : "");
  const description =
    project?.description ?? ("description" in props ? props.description : "");
  const technologies =
    project?.technologies ??
    ("technologies" in props ? props.technologies : []);
  const link = project?.link ?? ("link" in props ? props.link : undefined);

  return (
    <article className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

      {project?.year_completed && (
        <p className="mt-1 text-sm text-gray-500">
          <strong>Year completed:</strong> {project.year_completed}
        </p>
      )}

      <p className="mt-2 text-gray-600">{description}</p>

      <p className="mt-3 text-sm text-gray-700">
        <strong>Technologies:</strong> {technologies.join(", ")}
      </p>

      {project && (
        <p className="mt-2 text-sm text-gray-500">
          Type: {project.type === "opensource" ? "Open source" : "School"}
        </p>
      )}

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          View Project
        </a>
      )}

      {project && (
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-gray-200 pt-4">
          <Link
            href={`/projects/${project.id}/edit`}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
          >
            Edit
          </Link>
          <form action={deleteProject}>
            <input type="hidden" name="id" value={project.id} />
            <button
              type="submit"
              className="rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
            >
              Delete
            </button>
          </form>
        </div>
      )}
    </article>
  );
}

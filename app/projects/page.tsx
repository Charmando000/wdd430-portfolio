import {
  fetchProjects,
  fetchFilteredProjects,
  fetchProjectsPages,
} from '@/lib/projects-db';
import ProjectSearch from './ProjectSearch';
import Pagination from './Pagination';
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const query = params.query || '';
  const currentPage = Number(params.page) || 1;
  const totalPages = await fetchProjectsPages(query);

  const projects = query
  ? await fetchFilteredProjects(query, currentPage)
  : await fetchProjects(currentPage);

  return (
    <main>
      <h1>Projects</h1>

      <ProjectSearch />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Type: {project.type}</p>
            <p>Technologies: {project.technologies.join(', ')}</p>

            {project.link && (
              <a href={project.link} target="_blank">
                View Project
              </a>
            )}
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
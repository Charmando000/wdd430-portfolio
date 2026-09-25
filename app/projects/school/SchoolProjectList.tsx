import { getProjects } from '@/lib/projects-db';

export default async function SchoolProjectList() {
  const projects = await getProjects('school');

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>Technologies: {project.technologies.join(', ')}</p>
        </li>
      ))}
    </ul>
  );
}
import { sql } from '@vercel/postgres';

export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}
const ITEMS_PER_PAGE = 6;
export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows;
  }

  const { rows } = await sql<Project>`
    SELECT * FROM projects ORDER BY id
  `;
  return rows;
}

export async function fetchProjects(
  currentPage: number
): Promise<Project[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { rows } = await sql<Project>`
    SELECT *
    FROM projects
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return rows;
}

export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<Project[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const searchTerm = `%${query}%`;

  const { rows } = await sql<Project>`
    SELECT *
    FROM projects
    WHERE title ILIKE ${searchTerm}
       OR description ILIKE ${searchTerm}
       OR EXISTS (
         SELECT 1
         FROM unnest(technologies) AS technology
         WHERE technology ILIKE ${searchTerm}
       )
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return rows;
}

export async function fetchProjectsPages(
  query: string
): Promise<number> {
  const searchTerm = `%${query}%`;

  const { rows } = await sql<{ count: number }>`
    SELECT COUNT(*)::int AS count
    FROM projects
    WHERE title ILIKE ${searchTerm}
       OR description ILIKE ${searchTerm}
       OR EXISTS (
         SELECT 1
         FROM unnest(technologies) AS technology
         WHERE technology ILIKE ${searchTerm}
       )
  `;

  return Math.ceil(rows[0].count / ITEMS_PER_PAGE);
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;
  return rows[0] ?? null;
}
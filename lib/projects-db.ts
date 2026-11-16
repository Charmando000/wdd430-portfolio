
import { neon } from "@neondatabase/serverless";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

const sql = neon(process.env.POSTGRES_URL!);

export async function getProjects(
  type?: string | null
): Promise<Project[]> {
  if (type) {
    const rows = await sql`
      SELECT *
      FROM projects
      WHERE type = ${type}
      ORDER BY id
    `;

    return rows as Project[];
  }

  const rows = await sql`
    SELECT *
    FROM projects
    ORDER BY id
  `;

  return rows as Project[];
}

export async function getPaginatedProjects(
  search: string = "",
  page: number = 1,
  pageSize: number = 6
) {
  const safePage = Math.max(1, Math.floor(page));
  const offset = (safePage - 1) * pageSize;
  const searchPattern = search.trim()
    ? `%${search.trim()}%`
    : "%";

  const projects = await sql`
    SELECT *
    FROM projects
    WHERE
      title ILIKE ${searchPattern}
      OR COALESCE(description, '') ILIKE ${searchPattern}
      OR COALESCE(array_to_string(technologies, ' '), '') ILIKE ${searchPattern}
    ORDER BY id
    LIMIT ${pageSize}
    OFFSET ${offset}
  `;

  const countResult = await sql`
    SELECT COUNT(*) AS total
    FROM projects
    WHERE
      title ILIKE ${searchPattern}
      OR COALESCE(description, '') ILIKE ${searchPattern}
      OR COALESCE(array_to_string(technologies, ' '), '') ILIKE ${searchPattern}
  `;

  const total = Number(countResult[0].total);

  return {
    projects: projects as Project[],
    total,
    totalPages: Math.ceil(total / pageSize),
    currentPage: safePage,
  };
}

export async function getProjectById(
  id: number
): Promise<Project | null> {
  const rows = await sql`
    SELECT *
    FROM projects
    WHERE id = ${id}
  `;

  return (rows[0] as Project | undefined) ?? null;
}

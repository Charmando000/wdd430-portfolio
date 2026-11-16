import { getProjectById } from "@/lib/projects-db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return Response.json(
      { error: "Invalid id" },
      { status: 400 }
    );
  }

  const project = await getProjectById(id);

  if (!project) {
    return Response.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  return Response.json(project);
}
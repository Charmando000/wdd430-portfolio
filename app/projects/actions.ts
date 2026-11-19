"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProjectFormSchema, type ProjectFormData } from "@/lib/project-schema";
import {
  insertProject,
  updateProjectRecord,
  deleteProjectRecord,
} from "@/lib/projects-db";

export type ProjectActionState = {
  errors?: Partial<Record<keyof ProjectFormData, string[]>>;
  message?: string;
};

function getProjectFormData(formData: FormData) {
  const technologiesValue = String(formData.get("technologies") ?? "");

  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    type: String(formData.get("type") ?? ""),
    technologies: technologiesValue
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean),
    link: String(formData.get("link") ?? "").trim(),
    yearCompleted: String(formData.get("yearCompleted") ?? "").trim()
      ? Number(formData.get("yearCompleted"))
      : undefined,
  };
}

function revalidateProjectPages() {
  revalidatePath("/projects");
  revalidatePath("/projects/opensource");
  revalidatePath("/projects/school");
}

export async function createProject(
  _previousState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  const validatedFields = ProjectFormSchema.safeParse(
    getProjectFormData(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the highlighted fields.",
    };
  }

  try {
    await insertProject(validatedFields.data);
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      message: "Failed to create project. Please try again later.",
    };
  }

  revalidateProjectPages();
  redirect("/projects");
}

export async function updateProject(
  id: number,
  _previousState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  if (!Number.isSafeInteger(id) || id < 1) {
    return { message: "Invalid project ID." };
  }

  const validatedFields = ProjectFormSchema.safeParse(
    getProjectFormData(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the highlighted fields.",
    };
  }

  try {
    await updateProjectRecord(id, validatedFields.data);
  } catch (error) {
    console.error("Error updating project:", error);
    return {
      message: "Failed to update project. Please try again later.",
    };
  }

  revalidateProjectPages();
  redirect("/projects");
}

export async function deleteProject(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));

  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error("Invalid project ID.");
  }

  try {
    await deleteProjectRecord(id);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project. Please try again later.");
  }

  revalidateProjectPages();
}

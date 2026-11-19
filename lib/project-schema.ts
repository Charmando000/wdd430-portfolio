import { z } from "zod";

export const ProjectFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100, "Title must be 100 characters or fewer"),
  description: z.string().trim().min(1, "Description is required"),
  type: z.enum(["opensource", "school"], {
    error: "Choose a valid project type",
  }),
  technologies: z.array(z.string().trim().min(1)).min(1, "Add at least one technology"),
  link: z.union([z.url("Enter a valid URL"), z.literal("")]),
});

export type ProjectFormData = z.infer<typeof ProjectFormSchema>;

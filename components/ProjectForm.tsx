"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createProject, updateProject, type ProjectActionState } from "@/app/projects/actions";
import type { Project } from "@/lib/projects-db";

interface ProjectFormProps {
  project?: Project;
}

const initialState: ProjectActionState = {};

export default function ProjectForm({ project }: ProjectFormProps) {
  const action = project
    ? updateProject.bind(null, project.id)
    : createProject;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5 rounded-lg bg-white p-6 shadow">
      <div>
        <label htmlFor="title" className="mb-1 block font-medium text-gray-800">
          Project title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={100}
          defaultValue={project?.title ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
        />
        {state.errors?.title && <p className="mt-1 text-sm text-red-600">{state.errors.title[0]}</p>}
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block font-medium text-gray-800">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={project?.description ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
        />
        {state.errors?.description && <p className="mt-1 text-sm text-red-600">{state.errors.description[0]}</p>}
      </div>

      <div>
        <label htmlFor="type" className="mb-1 block font-medium text-gray-800">
          Project type
        </label>
        <select
          id="type"
          name="type"
          defaultValue={project?.type ?? "school"}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
        >
          <option value="school">School</option>
          <option value="opensource">Open source</option>
        </select>
        {state.errors?.type && <p className="mt-1 text-sm text-red-600">{state.errors.type[0]}</p>}
      </div>

      <div>
        <label htmlFor="technologies" className="mb-1 block font-medium text-gray-800">
          Technologies
        </label>
        <input
          id="technologies"
          name="technologies"
          type="text"
          required
          defaultValue={project?.technologies.join(", ") ?? ""}
          placeholder="Next.js, TypeScript, Tailwind CSS"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
        />
        <p className="mt-1 text-sm text-gray-500">Separate each technology with a comma.</p>
        {state.errors?.technologies && <p className="mt-1 text-sm text-red-600">{state.errors.technologies[0]}</p>}
      </div>

      <div>
        <label htmlFor="link" className="mb-1 block font-medium text-gray-800">
          Project URL (optional)
        </label>
        <input
          id="link"
          name="link"
          type="url"
          defaultValue={project?.link ?? ""}
          placeholder="https://example.com"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
        />
        {state.errors?.link && <p className="mt-1 text-sm text-red-600">{state.errors.link[0]}</p>}
      </div>

      {state.message && <p role="alert" className="text-sm text-red-600">{state.message}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-blue-700 px-5 py-2 font-medium text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {pending ? "Saving..." : project ? "Save changes" : "Create project"}
        </button>
        <Link
          href="/projects"
          className="rounded-md border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

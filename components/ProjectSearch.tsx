"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mt-6">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>

      <input
        id="project-search"
        type="search"
        placeholder="Search projects..."
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded-md border border-gray-300 px-4 py-2"
      />
    </div>
  );
}
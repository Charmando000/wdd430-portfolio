'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  }

  return (
    <div>
      {currentPage > 1 && (
        <a href={createPageURL(currentPage - 1)}>
          Previous
        </a>
      )}

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <a key={page} href={createPageURL(page)}>
            {page}
          </a>
        );
      })}

      {currentPage < totalPages && (
        <a href={createPageURL(currentPage + 1)}>
          Next
        </a>
      )}
    </div>
  );
}
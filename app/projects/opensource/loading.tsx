
export default function Loading() {
  return (
    <main className="py-8">
      <div className="h-9 w-64 animate-pulse rounded bg-gray-700" />

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-lg bg-gray-800 p-6 shadow"
          >
            <div className="h-7 w-3/4 rounded bg-gray-600" />

            <div className="mt-4 h-4 w-full rounded bg-gray-700" />
            <div className="mt-2 h-4 w-5/6 rounded bg-gray-700" />

            <div className="mt-5 h-4 w-2/3 rounded bg-gray-700" />
          </div>
        ))}
      </div>
    </main>
  );
}

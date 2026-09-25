export default function Loading() {
  return (
    <main className="animate-pulse space-y-6 bg-black p-6">
      <div className="h-8 w-64 rounded bg-slate-700" />

      <div className="space-y-4">
        <div className="h-6 w-80 rounded bg-slate-700" />
        <div className="h-4 w-full rounded bg-slate-800" />
        <div className="h-4 w-2/3 rounded bg-slate-800" />
        <div className="h-4 w-48 rounded bg-slate-800" />
      </div>
    </main>
  );
}
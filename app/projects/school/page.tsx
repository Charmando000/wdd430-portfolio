import { Suspense } from 'react';
import SchoolProjectList from './SchoolProjectList';

function ProjectListSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-80 rounded bg-slate-700" />
      <div className="h-4 w-full rounded bg-slate-800" />
      <div className="h-4 w-2/3 rounded bg-slate-800" />

      <div className="h-6 w-64 rounded bg-slate-700" />
      <div className="h-4 w-full rounded bg-slate-800" />
      <div className="h-4 w-3/4 rounded bg-slate-800" />
    </div>
  );
}

export default function SchoolPage() {
  return (
    <main>
      <h1>School Projects</h1>

      <Suspense fallback={<ProjectListSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </main>
  );
}
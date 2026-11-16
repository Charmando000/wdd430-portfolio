import Link from "next/link";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <nav className="mb-8 flex gap-6 border-b pb-4">
        <Link href="/projects">Overview</Link>
        <Link href="/projects/opensource">Open Source</Link>
        <Link href="/projects/school">School</Link>
      </nav>

      {children}
    </section>
  );
}
import SkillCard from "@/components/SkillCard";

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <section className="py-8">
        <h1 className="mb-4 text-3xl font-bold">
          About Me
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          I am a software development student interested in web development
          and full-stack applications. I enjoy learning new technologies and
          building projects with React and Next.js.
        </p>

        <h2 className="mb-4 text-2xl font-bold">
          Technologies I Use
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <SkillCard skill="JavaScript" />
          <SkillCard skill="React" />
          <SkillCard skill="Next.js" />
          <SkillCard skill="TypeScript" />
        </div>
      </section>
    </main>
  );
}
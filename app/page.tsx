import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "GameFinder",
    description:
      "A web application that helps users discover video games and find deals using external APIs.",
    technologies: ["HTML", "CSS", "JavaScript", "RAWG API", "CheapShark API"],
    link: "https://github.com/Charmando000/GameFinder",
  },
  {
    title: "LogiSync",
    description:
      "A web application designed to help small transportation companies manage drivers, routes, prices, and digital waybills.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/daniel3034/LogiSync",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="py-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          My Portfolio
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          I&apos;m a software development student learning full-stack
          development with Next.js and React. Here are some of my recent
          projects.
        </p>
      </section>

      <ProjectList projects={projects} />
    </main>
  );
}
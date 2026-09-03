export default function Footer() {
  return (
    <footer className="mt-12 bg-slate-800 py-6 text-white">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p>
          Copyright &copy; {new Date().getFullYear()} | Armando Fernandez | All rights reserved
        </p>
      </div>
    </footer>
  );
}
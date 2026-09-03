import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-800 text-white shadow-md">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          Armando Fernandez
        </div>

        <ul className="flex gap-6">
          <li>
            <Link href="/" className="hover:text-slate-300">
              Home
            </Link>
          </li>

          <li>
            <Link href="/about" className="hover:text-slate-300">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
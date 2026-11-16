"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-slate-800 text-white shadow-md">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          Armando Fernandez
        </div>

        <ul className="flex gap-6">
          <li>
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={pathname === "/" ? "text-yellow-400" : "hover:text-slate-300"}
            >
              Home
            </Link>
                      </li>

                      <li>
                        <Link
              href="/about"
              aria-current={pathname === "/about" ? "page" : undefined}
              className={pathname === "/about" ? "text-yellow-400" : "hover:text-slate-300"}
            >
              About
                        </Link>
                      </li>

                      <li>
                        <Link
              href="/projects"
              aria-current={pathname === "/projects" ? "page" : undefined}
              className={pathname === "/projects" ? "text-yellow-400" : "hover:text-slate-300"}
            >
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
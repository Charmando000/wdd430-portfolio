
"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t py-6">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p>
          Copyright &copy; {year ?? "2026"} | Armando Fernandez | All rights reserved
        </p>
      </div>
    </footer>
  );
}


"use cache";

export default async function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-6">
      <div className="mx-auto w-full max-w-7xl px-6">
        <p className="text-center">
          Copyright &copy; {year} | My Portfolio | All rights reserved.
        </p>
      </div>
    </footer>
  );
}


import { Link } from "react-router";
import { Trophy } from "lucide-react";

function HomePage() {
  return (
    <>
      <div className="relative min-h-screen bg-background text-white">
        <header className="absolute top-0 right-0 p-6">
          <Link
            to="/trophies"
            aria-label="Profilo"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary-light hover:text-secondary"
          >
            <Trophy className="h-5 w-5" />
          </Link>
        </header>

        <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl text-primary font-bold tracking-tight sm:text-6xl">
            Meditiamo
          </h1>
          <p className="mt-4 max-w-xl text-lg text-letters">
            Una semplice app che conta il tempo trascorso a meditare
          </p>
          <Link
            to="/timer"
            className="mt-8 rounded-lg bg-secondary px-6 py-3 font-medium text-letters transition hover:bg-secondary-light"
          >
            Medita
          </Link>
        </main>
      </div>
    </>
  );
}

export default HomePage;

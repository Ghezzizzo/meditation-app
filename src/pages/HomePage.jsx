import { Link } from "react-router";
import { Trophy } from "lucide-react";

function HomePage() {
  return (
    <>
      <div className="relative min-h-screen bg-slate-950 text-white">
        <header className="absolute top-0 right-0 p-6">
          <Link
            to="/trophies"
            aria-label="Profilo"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <Trophy className="h-5 w-5" />
          </Link>
        </header>

        <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Meditiamo
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">
            Una semplice app che conta il tempo trascorso a meditare
          </p>
          <Link
            to="/timer"
            className="mt-8 rounded-lg bg-indigo-500 px-6 py-3 font-medium text-white transition hover:bg-indigo-400"
          >
            Medita
          </Link>
        </main>
      </div>
    </>
  );
}

export default HomePage;

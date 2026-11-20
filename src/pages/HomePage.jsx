import { Link } from "react-router";
import { Trophy } from "lucide-react";
import IconLink from "../components/IconLink";

function HomePage() {
  return (
    <div className="relative">
      <header className="absolute top-0 right-0 p-6">
        <IconLink to="/trophies" ariaLabel="Trofei">
          <Trophy className="h-5 w-5" />
        </IconLink>
      </header>

      <main className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl text-primary font-bold tracking-tight sm:text-6xl">
          Meditiamo
        </h1>
        <p className="mt-4 max-w-xl text-lg ">
          Una semplice app che conta il tempo trascorso a meditare
        </p>
        <Link
          to="/timer"
          className="mt-8 rounded-lg bg-secondary px-6 py-3 font-medium transition hover:bg-secondary-light"
        >
          Medita
        </Link>
      </main>
    </div>
  );
}

export default HomePage;

import { useContext } from "react";
import { isTrophyUnlocked } from "../utils/trophyRules";
import { MeditationAppContext } from "../context/MeditationAppContext";
import { TrophyCard } from "../components/TrophyCard";
import { House } from "lucide-react";
import IconLink from "../components/IconLink";

function TrophiesPage() {
  const { sessions, trophies, loading, error } =
    useContext(MeditationAppContext);

  let content;
  if (loading)
    content = (
      <p
        role="status"
        className="mt-12 text-xl text-primary font-bold tracking-tight sm:text-2xl"
      >
        Caricamento trofei…
      </p>
    );
  else if (error)
    content = (
      <p
        role="alert"
        className="mt-12 text-2xl text-primary font-bold tracking-tight sm:text-4xl"
      >
        {error}
      </p>
    );
  else
    content = (
      <ul>
        {trophies.map((trophy) => (
          <li key={trophy.id}>
            <TrophyCard
              title={trophy.title}
              description={trophy.description}
              icon={trophy.icon}
              rarity={trophy.rarity}
              rarityText={trophy.rarityText}
              active={isTrophyUnlocked(trophy, sessions)}
            />
          </li>
        ))}
      </ul>
    );

  return (
    <div className="relative">
      <header className="absolute top-0 left-0 p-6">
        <IconLink to="/" ariaLabel="Home" border={false}>
          <House />
        </IconLink>
      </header>

      <main className="flex min-h-svh flex-col items-center px-4 text-center">
        <h1 className="mt-12 text-4xl text-primary font-bold tracking-tight sm:text-6xl">
          Trofei
        </h1>
        {content}
      </main>
    </div>
  );
}

export default TrophiesPage;

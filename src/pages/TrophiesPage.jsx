import { useContext } from "react";
import { isTrophyUnlocked } from "../utils/trophyRules";
import { MeditationAppContext } from "../context/MeditationAppContext";
import { TrophyCard } from "../components/TrophyCard";
import { House } from "lucide-react";
import IconLink from "../components/IconLink";

function TrophiesPage() {
  const { sessions, trophies } = useContext(MeditationAppContext);
  return (
    <>
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
          <ul>
            {trophies.map((trophy) =>
              isTrophyUnlocked(trophy, sessions) ? (
                <li key={trophy.id}>
                  <TrophyCard
                    title={trophy.title}
                    description={trophy.description}
                    icon={trophy.icon}
                    rarity={trophy.rarity}
                    rarityText={trophy.rarityText}
                    active={true}
                  />
                </li>
              ) : (
                <li key={trophy.id}>
                  <TrophyCard
                    key={trophy.id}
                    title={trophy.title}
                    description={trophy.description}
                    icon={trophy.icon}
                    rarity={trophy.rarity}
                    rarityText={trophy.rarityText}
                  />
                </li>
              ),
            )}
          </ul>
        </main>
      </div>
    </>
  );
}

export default TrophiesPage;

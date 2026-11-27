import { useContext } from "react";
import { MeditationAppContext } from "../../context/MeditationAppContext";
import { isTrophyUnlocked } from "../../utils/trophyRules";
import { TrophyCard } from "../TrophyCard";

function NewTrophies() {
  const { sessions, trophies } = useContext(MeditationAppContext);
  const previousSessions = sessions.slice(0, -1);
  const newTrophies = trophies.filter(
    (trophy) =>
      isTrophyUnlocked(trophy, sessions) &&
      !isTrophyUnlocked(trophy, previousSessions),
  );
  if (newTrophies.length === 0) return null;
  return (
    <div>
      {newTrophies.map((trophy) => (
        <TrophyCard
          key={trophy.id}
          title={trophy.title}
          description={trophy.description}
          icon={trophy.icon}
          rarity={trophy.rarity}
          rarityText={trophy.rarityText}
        />
      ))}
    </div>
  );
}

export default NewTrophies;

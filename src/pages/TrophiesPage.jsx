import { useContext } from "react";
import { isTrophyUnlocked } from "../utils/trophyRules";
import { MeditationAppContext } from "../context/MeditationAppContext";

function TrophiesPage() {
  const { sessions, trophies } = useContext(MeditationAppContext);
  return (
    <>
      <h1>TrophiesPage</h1>
      <ul>
        {trophies.map((trophy) => (
          <li key={trophy.id}>
            {trophy.title} {isTrophyUnlocked(trophy, sessions) ? "✔" : "🔒"}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TrophiesPage;

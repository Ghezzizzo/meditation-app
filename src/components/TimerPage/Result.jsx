import { ChevronRight } from "lucide-react";
import { msToMin, formatTimeText } from "../../utils/time";
import { isCompleted } from "../../utils/sessions";
import { useContext } from "react";
import { MeditationAppContext } from "../../context/MeditationAppContext";
import { isTrophyUnlocked } from "../../utils/trophyRules";

function Result({ durationMs, elapsedMs, pause, restart }) {
  const { sessions, trophies } = useContext(MeditationAppContext);
  const previousSessions = sessions.slice(0, -1);
  const newTrophies = trophies.filter(
    (trophy) =>
      isTrophyUnlocked(trophy, sessions) &&
      !isTrophyUnlocked(trophy, previousSessions),
  );

  const complete = isCompleted({ durationMs, elapsedMs }) ? "Sì" : "No";
  return (
    <div className=" p-6 border border-primary rounded-md shadow-xs mb-4">
      <h1 className="mb-4 text-xl font-bold text-primary">
        Meditazione terminata
      </h1>
      <ul role="list" className="space-y-4 my-6">
        <li className="flex items-center">
          <ChevronRight />
          <span className="text-primary">{`Durata: ${msToMin(durationMs)} min`}</span>
        </li>
        <li className="flex items-center">
          <ChevronRight />
          <span className="text-primary">{`Trascorso: ${formatTimeText(elapsedMs)}`}</span>
        </li>
        <li className="flex items-center">
          <ChevronRight />
          <span className="text-primary">{`Completata: ${complete}`}</span>
        </li>
        <li className="flex items-center">
          <ChevronRight />
          <span className="text-primary">{`Pause: ${pause}`}</span>
        </li>
        <li className="flex items-center">
          <ChevronRight />
          <span className="text-primary">{`Riavvii: ${restart}`}</span>
        </li>
      </ul>

      <ul>
        {newTrophies.map((trophy) => (
          <li key={trophy.id}>{`${trophy.title} ✔`}</li>
        ))}
      </ul>
    </div>
  );
}

export default Result;

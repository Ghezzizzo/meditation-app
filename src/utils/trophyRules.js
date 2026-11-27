import { isCompleted } from "./sessions";
import { minToMs } from "./time";

const MIN_NO_PAUSE_MINUTES = 5;

const trophiesRules = {
  firstMeditation: (sessions) => {
    return sessions.length > 0;
  },

  noPause: (sessions) => {
    return sessions.some(
      (session) =>
        session.pause === 0 &&
        session.elapsedMs >= minToMs(MIN_NO_PAUSE_MINUTES) &&
        isCompleted(session),
    );
  },
};

export function isTrophyUnlocked(trophy, sessions) {
  const rule = trophiesRules[trophy.id];

  if (!rule) {
    console.warn(`Nessuna regola per il trofeo ${trophy.id}`);
    return false;
  }

  return rule(sessions);
}

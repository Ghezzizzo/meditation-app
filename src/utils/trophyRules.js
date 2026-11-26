import { isCompleted } from "./sessions";
import { minToMs } from "./time";

const MIN_NO_PAUSE_MINUTES = 5;

export const rulesTrophies = {
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

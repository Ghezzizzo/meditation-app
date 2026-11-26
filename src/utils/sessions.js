export function isCompleted(session) {
  return session.elapsedMs >= session.durationMs;
}

export function createSession({ durationMs, elapsedMs, restart, pause }) {
  return {
    durationMs,
    elapsedMs,
    restart,
    pause,
  };
}

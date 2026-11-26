import { useState, useEffect } from "react";
import { MeditationAppContext } from "./MeditationAppContext";

const STORAGE_KEY = "meditation_app_sessions";

export const MeditationAppProvider = ({ children }) => {
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error(`errore nella lettura della sessione`, error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  function addSession(session) {
    setSessions((prev) => [...prev, session]);
  }

  return (
    <MeditationAppContext value={{ sessions, addSession }}>
      {children}
    </MeditationAppContext>
  );
};

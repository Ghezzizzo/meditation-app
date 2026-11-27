import { useState, useEffect } from "react";
import { MeditationAppContext } from "./MeditationAppContext";
import axios from "axios";

const STORAGE_KEY = "meditation_app_sessions";

export const MeditationAppProvider = ({ children }) => {
  const [trophies, setTrophies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        const response = await axios.get("/trophies.json");

        if (Array.isArray(response.data)) {
          setTrophies(response.data);
        } else {
          setError("Impossibile caricare i trofei.");
          console.error("I dati scaricati non sono un array");
        }
      } catch (err) {
        console.error("Errore nel recupero dei trofei:", err);
        setError("Impossibile caricare i trofei.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrophies();
  }, []);

  function addSession(session) {
    setSessions((prev) => [...prev, session]);
  }

  return (
    <MeditationAppContext
      value={{ sessions, addSession, trophies, loading, error }}
    >
      {children}
    </MeditationAppContext>
  );
};

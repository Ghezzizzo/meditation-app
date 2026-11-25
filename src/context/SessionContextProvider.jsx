import { useState } from "react";
import { SessionContext } from "./SessionContext";

export const SessionContextProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);

  function addSession(session) {
    setSessions((prev) => [...prev, session]);
  }

  return (
    <SessionContext value={{ sessions, addSession }}>{children}</SessionContext>
  );
};

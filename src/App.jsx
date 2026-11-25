import { Navigate, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import TimerPage from "./pages/TimerPage";
import TrophiesPage from "./pages/TrophiesPage";
import { SessionContextProvider } from "./context/SessionContextProvider";

function App() {
  return (
    <SessionContextProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/trophies" element={<TrophiesPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SessionContextProvider>
  );
}

export default App;

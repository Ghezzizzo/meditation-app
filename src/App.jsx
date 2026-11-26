import { Navigate, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import TimerPage from "./pages/TimerPage";
import TrophiesPage from "./pages/TrophiesPage";
import { MeditationAppProvider } from "./context/MeditationAppProvider";

function App() {
  return (
    <MeditationAppProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/trophies" element={<TrophiesPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MeditationAppProvider>
  );
}

export default App;

import { House } from "lucide-react";
import { useState } from "react";
import IdleControls from "../components/TimerPage/IdleControls";
import MeditationControls from "../components/TimerPage/MeditationControls";
import FinishControls from "../components/TimerPage/FinishControls";
import PauseControls from "../components/TimerPage/PauseControls";
import IconLink from "../components/IconLink";

function TimerPage() {
  const [phase, setPhase] = useState("Idle");

  function handlePause() {
    setPhase("Pause");
  }
  function handleFinish() {
    setPhase("Finish");
  }
  function handleStart() {
    setPhase("Meditation");
  }
  function handleNewTimer() {
    setPhase("Idle");
  }

  const showPhase = () => {
    if (phase === "Meditation")
      return <MeditationControls onPause={handlePause} />;
    if (phase === "Pause")
      return <PauseControls onResume={handleStart} onEnd={handleFinish} />;
    if (phase === "Finish")
      return <FinishControls onNewTimer={handleNewTimer} />;
    if (phase === "Idle") return <IdleControls onStart={handleStart} />;
  };

  return (
    <div className="relative">
      <header className="absolute top-0 left-0 p-6">
        <IconLink to="/" ariaLabel="Home" border={false}>
          <House />
        </IconLink>
      </header>
      <main className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
        {showPhase()}
      </main>
    </div>
  );
}

export default TimerPage;

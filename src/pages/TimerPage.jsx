import { House } from "lucide-react";
import { useState } from "react";
import Idle from "../components/TimerPage/Idle";
import Meditation from "../components/TimerPage/Meditation";
import Finish from "../components/TimerPage/Finish";
import Pause from "../components/TimerPage/Pause";
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
    if (phase === "Meditation") return <Meditation onPause={handlePause} />;
    if (phase === "Pause")
      return <Pause onResume={handleStart} onEnd={handleFinish} />;
    if (phase === "Finish") return <Finish onNewTimer={handleNewTimer} />;
    if (phase === "Idle") return <Idle onStart={handleStart} />;
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

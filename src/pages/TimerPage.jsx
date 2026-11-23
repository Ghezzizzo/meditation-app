import { House } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import IdleControls from "../components/TimerPage/IdleControls";
import MeditationControls from "../components/TimerPage/MeditationControls";
import FinishControls from "../components/TimerPage/FinishControls";
import PauseControls from "../components/TimerPage/PauseControls";
import Timer from "../components/TimerPage/Timer";
import IconLink from "../components/IconLink";
import Result from "../components/TimerPage/Result";

function TimerPage() {
  const [phase, setPhase] = useState("Idle");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [durationMs, setDurationMs] = useState(300000);

  const startTimeRef = useRef(null);

  useEffect(() => {
    if (phase !== "Meditation") return;

    const id = setInterval(() => {
      const currentElapsed = Date.now() - startTimeRef.current;

      if (currentElapsed >= durationMs) {
        clearInterval(id);
        setElapsedMs(durationMs);
        setPhase("Finish");
      } else {
        setElapsedMs(currentElapsed);
      }
    }, 100);

    return () => clearInterval(id);
  }, [phase, durationMs]);

  function handlePause() {
    setPhase("Pause");
  }
  function handleFinish() {
    setPhase("Finish");
  }
  function handleStart() {
    startTimeRef.current = Date.now() - elapsedMs;
    setPhase("Meditation");
  }
  function handleNewTimer() {
    setElapsedMs(0);
    setPhase("Idle");
  }

  function handleRestart() {
    startTimeRef.current = Date.now();
    setElapsedMs(0);
    setPhase("Meditation");
  }

  const showControls = () => {
    if (phase === "Meditation")
      return (
        <MeditationControls onPause={handlePause} onRestart={handleRestart} />
      );
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
        {phase === "Pause" || phase === "Meditation" ? (
          <Timer duration={durationMs} elaps={elapsedMs} />
        ) : (
          <Result />
        )}

        {showControls()}
      </main>
    </div>
  );
}

export default TimerPage;

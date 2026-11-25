import { House } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import IdleControls from "../components/TimerPage/IdleControls";
import MeditationControls from "../components/TimerPage/MeditationControls";
import FinishControls from "../components/TimerPage/FinishControls";
import PauseControls from "../components/TimerPage/PauseControls";
import Timer from "../components/TimerPage/Timer";
import IconLink from "../components/IconLink";
import Result from "../components/TimerPage/Result";
import DurationPicker from "../components/TimerPage/DurationPicker";
import { minToMs } from "../utils/time";

const DEFAULT_DURATION = minToMs(5);

function TimerPage() {
  const [phase, setPhase] = useState("Idle");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [restart, setRestart] = useState(0);
  const [pause, setPause] = useState(0);
  const [durationMs, setDurationMs] = useState(DEFAULT_DURATION);

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
    setPause((prev) => prev + 1);
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
    setPause(0);
    setRestart(0);
    setDurationMs(DEFAULT_DURATION);
    setPhase("Idle");
  }

  function handleRestart() {
    startTimeRef.current = Date.now();
    setRestart((prev) => prev + 1);
    setElapsedMs(0);
    setPause(0);
    setPhase("Meditation");
  }

  function showPhase() {
    switch (phase) {
      case "Idle":
        return (
          <div className="flex flex-col">
            <DurationPicker onSelect={setDurationMs} value={durationMs} />
            <IdleControls onStart={handleStart} />
          </div>
        );
      case "Meditation":
        return (
          <div className="flex flex-col">
            <Timer durationMs={durationMs} elapsedMs={elapsedMs} />
            <MeditationControls
              onPause={handlePause}
              onRestart={handleRestart}
            />
          </div>
        );
      case "Pause":
        return (
          <div className="flex flex-col">
            <Timer durationMs={durationMs} elapsedMs={elapsedMs} />
            <PauseControls onResume={handleStart} onEnd={handleFinish} />
          </div>
        );
      case "Finish":
        return (
          <div className="flex flex-col">
            <Result
              durationMs={durationMs}
              elapsedMs={elapsedMs}
              pause={pause}
              restart={restart}
            />
            <FinishControls onNewTimer={handleNewTimer} />
          </div>
        );
      default:
        return (
          <div>
            <h1>Fase sconosciuta</h1>
          </div>
        );
    }
  }

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

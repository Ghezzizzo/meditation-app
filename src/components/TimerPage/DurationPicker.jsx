import { minToMs } from "../../utils/time";

const DURATION_MINUTES = [1, 2, 3, 5, 10, 15, 20, 30, 60];

function DurationPicker({ onSelect, value }) {
  return (
    <div className="flex flex-col min-h-full">
      <h1 className="text-4xl text-primary font-bold tracking-tight sm:text-6xl">
        Seleziona timer
      </h1>
      <div className="grid grid-cols-3 gap-4 p-6">
        {DURATION_MINUTES.map((duration) => {
          const isPressed = value === minToMs(duration);
          return (
            <button
              type="button"
              key={duration}
              aria-pressed={isPressed}
              onClick={() => onSelect(minToMs(duration))}
              className="aria-pressed:bg-secondary-light aria-pressed:text-primary bg-primary-light hover:bg-primary text-secondary font-semibold py-2 px-4 border border-primary rounded-2xl shadow text-xl"
            >
              {`${duration} min`}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DurationPicker;

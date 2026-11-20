import { ClockPlus, Trophy } from "lucide-react";
import IconButton from "../IconButton";
import IconLink from "../IconLink";

function Finish({ onNewTimer }) {
  return (
    <div>
      <p>Finish</p>
      <div className="flex gap-4">
        <IconButton onClick={onNewTimer} ariaLabel="Nuovo timer">
          <ClockPlus />
        </IconButton>

        <IconLink to="/trophies" ariaLabel="Trofei">
          <Trophy className="h-5 w-5" />
        </IconLink>
      </div>
    </div>
  );
}

export default Finish;

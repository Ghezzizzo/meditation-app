import { Baby, Trophy, FastForward, Lock } from "lucide-react";

// Mappa tra la stringa del JSON e il componente Lucide
const ICON_MAP = {
  baby: Baby,
  trophy: Trophy,
  fastforward: FastForward,
};

const RARITY_STYLES = {
  common: {
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    iconBg: "bg-slate-100 text-slate-600",
    borderHover: "hover:border-slate-300",
  },
  rare: {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-100 text-blue-600",
    borderHover: "hover:border-blue-300",
  },
  epic: {
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    iconBg: "bg-purple-100 text-purple-600",
    borderHover: "hover:border-purple-300",
  },
  hidden: {
    badge: "bg-amber-50 text-amber-700 border-amber-300",
    iconBg: "bg-amber-100 text-amber-600",
    borderHover: "hover:border-amber-400",
  },
};

export function TrophyCard({
  title,
  description,
  icon,
  rarity = "common",
  rarityText = "Comune",
  active = false,
}) {
  const style = RARITY_STYLES[rarity.toLowerCase()] || RARITY_STYLES.common;
  const IconComponent =
    (typeof icon === "string" ? ICON_MAP[icon.toLowerCase()] : icon) || Trophy;

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border border-foreground bg-background p-3 my-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${style.borderHover}`}
    >
      <IconComponent
        className={`h-8 w-8 ${active ? "text-primary bg-secondary" : "text-gray-400 bg-gray-200"} rounded-full p-1`}
        strokeWidth={2}
      />

      <div className="flex-1">
        <div className="mb-1 flex items-center justify-between gap-2">
          <div className="flex items-center">
            <h3 className="font-bold text-primary">{title}</h3>

            {active ? null : (
              <Lock
                aria-label="Bloccato"
                className="w-3 h-3 ml-2 text-primary"
              />
            )}
          </div>

          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${style.badge}`}
          >
            {rarityText}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-primary-light">
          {description}
        </p>
      </div>
    </div>
  );
}

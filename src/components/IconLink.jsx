import { Link } from "react-router";

function IconLink({ children, ariaLabel, to, border = true }) {
  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-primary transition hover:bg-primary-light hover:text-secondary ${border ? "border border-primary" : ""}`}
    >
      {children}
    </Link>
  );
}

export default IconLink;

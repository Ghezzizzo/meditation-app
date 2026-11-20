function IconButton({ children, ariaLabel, onClick, border = true }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-primary transition hover:bg-primary-light hover:text-secondary ${border ? "border border-primary" : ""}`}
    >
      {children}
    </button>
  );
}

export default IconButton;

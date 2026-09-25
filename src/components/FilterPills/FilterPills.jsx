const pillBase =
  "rounded-pill border px-[1.2rem] py-[0.55rem] text-[0.85rem] font-medium transition-[background,color,border-color] duration-150";

export function FilterPills({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Filtrar por universo">
      {options.map((option) => {
        const isActive = active === option;
        return (
          <button
            key={option}
            type="button"
            className={
              isActive
                ? `${pillBase} bg-surface border-text text-text`
                : `${pillBase} bg-surface border-border text-text-muted hover:text-text`
            }
            onClick={() => onChange(option)}
            aria-pressed={isActive}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

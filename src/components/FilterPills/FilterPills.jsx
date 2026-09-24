import styles from "./FilterPills.module.css";

export function FilterPills({ options, active, onChange }) {
  return (
    <div className={styles.pills} role="group" aria-label="Filtrar por universo">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`${styles.pill} ${active === option ? styles.active : ""}`}
          onClick={() => onChange(option)}
          aria-pressed={active === option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

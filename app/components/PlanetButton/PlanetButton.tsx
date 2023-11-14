import styles from "./PlanetButton.module.css";

export const PlanetButton = ({
  value,
  handleClick,
  color,
}: {
  value: string;
  color: string;
  handleClick: (v: string) => void;
}) => {
  return value !== "unknown" ? (
    <button
      onClick={() => handleClick(value)}
      className={styles.planetButton}
      style={{ ["--color" as string]: color }}
    >
      {value}
    </button>
  ) : (
    <img
      src="/question.png"
      alt="unknown data"
      className={styles.unknownIcon}
    />
  );
};

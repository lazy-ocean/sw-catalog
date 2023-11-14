import styles from "./PlanetButton.module.css";

export const PlanetButton = ({
  value,
  handleClick,
  color,
  id,
}: {
  value: string;
  color: string;
  handleClick: (v: string) => void;
  id: string;
}) => {
  return value !== "unknown" ? (
    <button
      onClick={() => handleClick(id)}
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

import { PlanetData, ClimateTypes } from "../../interfaces";
import styles from "./ModalContent.module.css";

const climateMapping = {
  [ClimateTypes.arid]: "🏜️",
  [ClimateTypes.frigid]: "❄️",
  [ClimateTypes.hot]: "☀️",
  [ClimateTypes.moist]: "💧",
  [ClimateTypes.polluted]: "🌫️",
  [ClimateTypes.rocky]: "🪨",
  [ClimateTypes.subarctic]: "🧊",
  [ClimateTypes.superheated]: "🔥",
  [ClimateTypes.temperate]: "🌱",
  [ClimateTypes.tropical]: "🌴",
  [ClimateTypes.windy]: "༄",
  [ClimateTypes.unknown]: "❓",
};

const formatValue = (item: string | number) =>
  isNaN(Number(item)) ? item : Number(item).toLocaleString();

export const ModalContent = ({ data }: { data: PlanetData }) => {
  const { name, population, diameter, climate } = data;

  const datamap = [
    { label: "Diameter", value: formatValue(diameter) },
    { label: "Population", value: formatValue(population) },
    { label: "Climate", value: climateMapping[climate] },
  ];

  return (
    <>
      <img src="/planet.png" alt={name} className={styles.cover} />
      <h2 className={styles.header}>{name}</h2>
      <div className={styles.wrapper}>
        {datamap.map(({ label, value }) => (
          <div className={styles.stat} key={label}>
            {label === "Climate" ? (
              <div className={styles.climateWrapper}>
                <span className={styles.value}>{value}</span>
                <span>{climate}</span>
              </div>
            ) : (
              <span className={styles.value}>{value}</span>
            )}
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>
    </>
  );
};

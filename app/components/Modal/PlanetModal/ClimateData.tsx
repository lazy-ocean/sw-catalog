import React from "react";
import { ClimateTypes } from "../../../interfaces";
import styles from "./ClimateData.module.css";

const climateMapping = {
  [ClimateTypes.arid]: "🏜️",
  [ClimateTypes.frigid]: "❄️",
  [ClimateTypes.hot]: "☀️",
  [ClimateTypes.moist]: "💧",
  [ClimateTypes.polluted]: "🌫️",
  [ClimateTypes.rocky]: "🪨",
  [ClimateTypes.subartic]: "🧊",
  [ClimateTypes.artic]: "🧊",
  [ClimateTypes.superheated]: "🔥",
  [ClimateTypes.temperate]: "🌱",
  [ClimateTypes.tropical]: "🌴",
  [ClimateTypes.windy]: "༄",
  [ClimateTypes.unknown]: "unknown",
};

export const ClimateData = ({
  climate,
}: {
  climate: string | ClimateTypes;
}) => {
  const string = climate.split(", ");
  if (Array.isArray(string)) {
    const res = string.map((climate) => ({
      value: climateMapping[climate as ClimateTypes],
      climate,
    }));

    return (
      <div className={styles.climateWrapper}>
        {res.map(({ value, climate }) => (
          <div key={value}>
            <span className={styles.value}>{value}</span>
            {climate !== ClimateTypes.unknown && <span>{climate}</span>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.climateWrapper}>
      <span className={styles.value}>
        {climateMapping[climate as ClimateTypes]}
      </span>
      <span>{climate}</span>
    </div>
  );
};

import { PlanetData } from "../../interfaces";
import styles from "./ModalContent.module.css";
import { ClimateData } from "./PlanetModal/ClimateData";
import { PlanetIcon } from "./PlanetModal/PlanetIcon";

const formatValue = (item: string | number) =>
  isNaN(Number(item)) ? item : Number(item).toLocaleString();

export const ModalContent = ({
  data,
  color,
}: {
  data: PlanetData;
  color: string;
}) => {
  const { name, population, diameter, climate } = data;

  const datamap = [
    { label: "Diameter", value: formatValue(diameter) },
    { label: "Population", value: formatValue(population) },
    { label: "Climate" },
  ];

  return (
    <>
      <PlanetIcon color={color} />
      <h2 className={styles.header}>{name}</h2>
      <div className={styles.wrapper}>
        {datamap.map(({ label, value }) => (
          <div className={styles.stat} key={label}>
            {label === "Climate" ? (
              <ClimateData climate={climate} />
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

import { PlanetData } from "../../interfaces";

export const ModalContent = ({ data }: { data: PlanetData }) => {
  const { name, population, diameter, climate } = data;
  return (
    <>
      <p>{name}</p>
      <p>{population}</p>
      <p>{diameter}</p>
      <p>{climate}</p>
    </>
  );
};

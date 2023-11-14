import { Row } from "@tanstack/react-table";
import { Person } from "../interfaces";

export const sortPlanets = (rowA: Row<Person>, rowB: Row<Person>): number => {
  const valA = rowA.original.homeworld;
  const valB = rowB.original.homeworld;

  if (valA === "unknown") return 1;
  if (valB === "unknown") return -1;
  return valA.localeCompare(valB);
};

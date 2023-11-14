import { SortingFn } from "@tanstack/react-table";

declare module "@tanstack/table-core" {
  interface SortingFns {
    customSorting: SortingFn<unknown>;
  }
}

export interface TableProps {
  people: Person[];
  planets: { [key: string]: PlanetData };
}

export interface Person {
  name: string;
  height: string;
  mass: string;
  created: string;
  edited: string;
  homeworld: string;
  homeworldData: { id: string; name: string };
}

export interface SwListData {
  count: number;
  next: string;
  previous: string;
  results: Person[];
}

export interface PlanetData {
  name: string;
  population: string;
  diameter: string;
  climate: ClimateTypes;
  color: string;
}

export enum SortDirection {
  asc = "asc",
  desc = "desc",
  false = "false",
}

export enum ClimateTypes {
  temperate = "temperate",
  unknown = "unknown",
  moist = "moist",
  polluted = "polluted",
  arid = "arid",
  tropical = "tropical",
  rocky = "rocky",
  windy = "windy",
  frigid = "frigid",
  hot = "hot",
  subarctic = "subarctic",
  superheated = "superheated",
}

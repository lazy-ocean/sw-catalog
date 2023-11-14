/* export enum Gender {
  male = "male",
  unknown = "n/a",
  female = "female",
} */

export interface TableProps {
  people?: Person[];
  planets: { [key: string]: PlanetData };
}

export interface Person {
  name: string;
  height: string;
  mass: string;
  created: string; // timestamp
  edited: string; // timestamp
  homeworld: string; // set
  homeworldData: { id: string; name: string };
  // not required by task
  /*  hair_color: string; */
  /*   skin_color: string; */
  /*   eye_color: string; */
  /*   birth_year: string; */
  /*   gender: Gender; */
  /*   films: string[]; // set */
  /*   species: string[]; // set ? */
  /*   vehicles: string[]; // set */
  /*   starships: string[]; // set */
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
  // not required by task
  /*   rotation_period: "unknown";
  orbital_period: "unknown"; */
  /*   gravity: "1 standard";
  terrain: "grass";
  surface_water: "unknown"; */
  /*   residents: [Array];
  films: [];
  created: "2014-12-10T16:16:26.566000Z";
  edited: "2014-12-20T20:58:18.452000Z";
  url: "https://swapi.dev/api/planets/20/"; */
}

export enum SortingDirection {
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

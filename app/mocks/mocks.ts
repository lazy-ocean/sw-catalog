import { ClimateTypes } from "../interfaces";

export const mockPlanets = {
  "https://swapi.dev/api/planets/1": {
    name: "Shili",
    diameter: "unknown",
    climate: ClimateTypes.arid,
    population: "unknown",
    url: "https://swapi.dev/api/planets/1",
    color: "#dfba9f",
  },
  "https://swapi.dev/api/planets/2": {
    name: "Umbara",
    diameter: "unknown",
    climate: ClimateTypes.artic,
    population: "unknown",
    url: "https://swapi.dev/api/planets/2",
    color: "#a3b1e0",
  },
};

export const mockPeople = [
  {
    name: "Sly Moore",
    height: "178",
    mass: "48",
    homeworld: "Shili",
    created: "2014-12-20T20:18:37.619000Z",
    edited: "2014-12-20T21:17:50.496000Z",
    url: "https://swapi.dev/api/people/82/",
    homeworldId: "https://swapi.dev/api/planets/1",
  },
  {
    name: "Tion Medon",
    height: "206",
    mass: "80",
    homeworld: "Umbara",
    created: "2014-12-20T20:35:04.260000Z",
    edited: "2014-12-20T21:17:50.498000Z",
    url: "https://swapi.dev/api/people/83/",
    homeworldId: "https://swapi.dev/api/planets/2",
  },
];

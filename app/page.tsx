import Main from "./components/Main/Main";
import { Person, PlanetData, SwListData } from "./interfaces";

const API_LINK = "https://swapi.dev/api/people";
// TODO: slice unnecessary data??
async function getData(): Promise<{
  people: Person[];
  planets: { [key: string]: PlanetData };
}> {
  const data = {} as {
    people: Person[];
    planets: { [key: string]: PlanetData };
  };
  try {
    let peopleList: Person[] = [];
    const fetchPeopleData = async (url: string) => {
      const peopleApiData = await fetch(url);
      const peopleData: SwListData = await peopleApiData.json();
      peopleList = [...peopleList, ...peopleData.results];
      if (peopleData.next) {
        await fetchPeopleData(peopleData.next);
      }
      return;
    };

    await fetchPeopleData(API_LINK);
    data.people = peopleList;

    const planetData: { [key: string]: PlanetData } = {};

    await Promise.all(
      peopleList.map(async (person) => {
        const homeworldURL = person.homeworld;

        if (!planetData[homeworldURL]) {
          const planetResponse = await fetch(homeworldURL);
          planetData[homeworldURL] = await planetResponse.json();
        }
      })
    );

    data.planets = planetData;
  } catch (e) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default async function Page() {
  const data = await getData();
  return <Main {...data} />;
}

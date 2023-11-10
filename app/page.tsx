import Main from "./components/Main/Main";

interface MuseumData {
  objectIDs: string[];
}

export interface ImageObject {
  objectID: number;
  primaryImage: string;
  primaryImageSmall: string;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  medium: string;
}

async function getImages(): Promise<ImageObject[]> {
  let art: ImageObject[] = [];
  try {
    const museumData = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=trueq=monet&hasImages=true&medium=Paintings"
    );
    const data: MuseumData = await museumData.json();
    const imageIds = data.objectIDs.slice(0, 20);
    const promises = imageIds.map((id) =>
      fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      ).then((res) => res.json())
    );
    const imageResults = await Promise.all(promises);
    art = imageResults.filter(
      ({ primaryImage, primaryImageSmall }) => primaryImage || primaryImageSmall
    );
  } catch (e) {
    console.log(e);
  }
  return art;
}

export default async function Page() {
  const art = await getImages();
  return <Main version={"14"} art={art} />;
}

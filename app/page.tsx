import Main from "./components/Main/Main";

async function getData(): Promise<any> {
  let data: any[] = [];
  try {
    const apiData = await fetch("api");
    data = await apiData.json();
  } catch (e) {
    console.log(e);
  }
  return data;
}

export default async function Page() {
  const data = await getData();
  return <Main data={data} />;
}

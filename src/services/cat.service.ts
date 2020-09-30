export const fetchCatData = async (id: string | number) => {
  const url: string = `https://api.thecatapi.com/v1/images/${id}`;
  const data: Response = await fetch(url);
  const catObject: any = await data.json();

  return {
    id: catObject.id,
    url: catObject.url,
    height: catObject.height,
    width: catObject.width,
  };
};

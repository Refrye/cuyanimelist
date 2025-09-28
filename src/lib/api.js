
export const getAnimeResponse = async (resource, query = {}) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`);

  // kalau query object → ubah jadi search params
  Object.keys(query).forEach((key) => url.searchParams.append(key, query[key]));

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Failed to fetch anime data");
  }
  return response.json();
};

export const getNestedAnimeResponse = async(resource, objectProperty) => {
    const response = await getAnimeResponse(resource)
    return response.data.flatMap(item => item[objectProperty])
}

export const reproduce = (data, gap) => {
    const first = ~~(Math.random() * (data.length - gap) + 1)
    const last = first + gap

    const response = {
        data: data.slice(first, last)
    }

    return response
}
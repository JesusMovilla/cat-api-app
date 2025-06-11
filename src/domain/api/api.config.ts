import axios from "axios";

const apiCat = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: { "x-api-key": process.env.EXPO_PUBLIC_API_KEY },
});

export async function publicFetcher<T>(route: string, params?: object) {
  const response = await apiCat.get<T>(route, { params: { ...params } });
  return response;
}

export default publicFetcher;

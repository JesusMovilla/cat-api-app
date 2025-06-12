import { CatBreed, CatImage } from "../interfaces/cat";
import publicFetcher from "./api/api.config";

export const catEndpoints = {
  // Get cat breeds
  getCatBreeds: (params?: object) =>
    publicFetcher<CatBreed[]>("breeds", params),
  searchCatBreed: (params: { q: string; attach_image?: boolean }) =>
    publicFetcher<CatBreed[]>("breeds/search", params),
  // Get cat breed detail
  getCatBreedDetail: (catId: string) =>
    publicFetcher<CatBreed>(`breeds/${catId}`),
  // Get cat breed images
  getCatBreedImages: (params: { limit: number; breed_ids: string }) =>
    publicFetcher<CatImage[]>("images/search", params),
};

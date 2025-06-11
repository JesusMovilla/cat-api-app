import { CatBreed, CatImage } from "../interfaces/cat";
import publicFetcher from "./api/api.config";

export const catEndpoints = {
  // Get cat breeds
  getCatsBreeds: (params?: object) =>
    publicFetcher<CatBreed[]>("breeds", params),
  // Get cat breed detail
  getCatBreedDetail: (catId: string) =>
    publicFetcher<CatBreed>(`breeds/${catId}`),
  // Get cat breed images
  getCatBreedImages: (params: { limit: number; breed_ids: string }) =>
    publicFetcher<CatImage[]>("images/search", params),
};

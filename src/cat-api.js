import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_Tofa9UBgEAzId21Cf0DSCL6NXdrYcxFsS7EKfYYX4lseFHS53ufoxfRxiFlM1B7E";

export async function fetchBreeds() {
  try {
      const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cat breeds');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
      );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cat info');
  }
}
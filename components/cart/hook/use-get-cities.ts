import { useQuery } from "@tanstack/react-query";

// Fetching cities based on the state ID
const fetchCities = async (stateId: string) => {
  const response = await fetch(`/api/cities?state=${stateId}`); // Use proxy path
  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات شهرها");
  }
  const data = await response.json();
  return data;
};

// Custom hook to fetch cities
export const useCities = (stateId: string) => {
  return useQuery({
    queryKey: ["cities", stateId], // Use the stateId as part of the queryKey
    queryFn: () => fetchCities(stateId), // Fetch cities based on the selected state
    enabled: !!stateId, // Only fetch cities when a state is selected
  });
};

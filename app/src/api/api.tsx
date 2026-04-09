export const API_URL = import.meta.env.VITE_API_URL;

export const fetchMatches = async () => {
  const response = await fetch(`${API_URL}/v1/match`);
  console.log("response ", response);
  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
};

export const fetchMatchById = async (id: string) => {
  const response = await fetch(`${API_URL}/v1/match/${id}`);
  console.log("Response ", response);
  if (!response.ok) {
    throw new Error("Failed to fetch match");
  }

  return response.json();
};

import type { Contraband } from "@/utils/types";

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
  if (!id) throw new Error("Match id not provided)");

  const response = await fetch(`${API_URL}/v1/match/${id}`);
  console.log("Response ", response);
  if (!response.ok) {
    throw new Error("Failed to fetch match");
  }

  return response.json();
};

export const fetchContrabands = async (): Promise<{
  contrabands: Contraband[];
}> => {
  const response = await fetch(`${API_URL}/v1/contraband`);
  console.log("Response ", response);
  if (!response.ok) {
    throw new Error("Failed to fetch contrabands");
  }

  return response.json();
};

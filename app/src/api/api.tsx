import type { PlayerFormData } from "@/utils/schemas";
import type { Contraband, Match } from "@/utils/types";

export const API_URL = import.meta.env.VITE_API_URL;

export const fetchMatches = async () => {
  const response = await fetch(`${API_URL}/v1/match`);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
};

export const fetchMatchById = async (id: string): Promise<{ match: Match }> => {
  if (!id) throw new Error("Match id not provided)");

  const response = await fetch(`${API_URL}/v1/match/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch match");
  }

  return response.json();
};

export const fetchContrabands = async (): Promise<{
  contrabands: Contraband[];
}> => {
  const response = await fetch(`${API_URL}/v1/contraband`);

  if (!response.ok) {
    throw new Error("Failed to fetch contrabands");
  }

  return response.json();
};

export const calculateMatchScore = async (players: PlayerFormData[]) => {
  try {
    const response = await fetch(`${API_URL}/v1/match/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ players: players }),
    });
    console.log("Match response ", response);
    if (!response.ok) {
      throw new Error("Failed to calculate match score");
    }

    return response.json();
  } catch (error) {
    console.error("Error : ", error);
  }
};

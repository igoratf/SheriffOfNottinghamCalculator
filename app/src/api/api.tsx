import type { PlayerFormData } from "@/utils/schemas";
import type { Contraband, Match } from "@/utils/types";

export const API_URL = import.meta.env.VITE_API_URL;

type Matches = {
  matches: {
    data: Match[];
    pagination: { count: number; numberOfPages: number };
  };
};

type MatchesSearchParams = {
  page: number;
  players?: string;
  dateFrom?: string;
  dateTo?: string;
};

export const fetchMatches = async (
  params: MatchesSearchParams,
): Promise<Matches> => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page));
  if (params.players) searchParams.set("players", params.players);
  if (params.dateFrom) searchParams.set("dateFrom", params.dateFrom);
  if (params.dateTo) searchParams.set("dateTo", params.dateTo);

  console.log("params ", searchParams.toString());

  const response = await fetch(
    `${API_URL}/v1/match?${searchParams.toString()}`,
  );

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

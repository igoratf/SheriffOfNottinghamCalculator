import type { ResourceName } from "./types.d";

export const RESOURCE_SCORE_MAP: Record<ResourceName, number> = {
  apple: 2,
  cheese: 3,
  bread: 3,
  chicken: 4,
  coin: 1,
  contraband: 1,
};

export const KINGS_AND_QUEENS_BONUS = {
  king: {
    apple: 20,
    bread: 15,
    cheese: 15,
    chicken: 10,
  } as Record<ResourceName, number>,
  queen: {
    apple: 10,
    bread: 10,
    cheese: 10,
    chicken: 5,
  } as Record<ResourceName, number>,
};

export const RESOURCE_NAMES: ResourceName[] = [
  "apple",
  "bread",
  "chicken",
  "cheese",
];

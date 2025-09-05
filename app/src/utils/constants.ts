import type { ResourceName, Contraband } from "./types.d";

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

export const CONTRABAND_OPTIONS: Contraband[] = [
  {
    name: "Pepper",
    score: 6,
  },
  {
    name: "Mead",
    score: 7,
  },
  {
    name: "Silk",
    score: 8,
  },
  {
    name: "Crossbow",
    score: 9,
  },
  { name: "Green Apples", score: 4, resourceBonus: 2, resourceType: "apple" },
  {
    name: "Golden Apples",
    score: 6,
    resourceBonus: 2,
    resourceType: "apple",
  },
  {
    name: "Bleu Cheese",
    score: 9,
    resourceBonus: 2,
    resourceType: "cheese",
  },
  {
    name: "Gouda Cheese",
    score: 6,
    resourceBonus: 2,
    resourceType: "cheese",
  },
  {
    name: "Rye Bread",
    score: 6,
    resourceBonus: 2,
    resourceType: "bread",
  },
  {
    name: "Pumpernickel Bread",
    score: 9,
    resourceBonus: 2,
    resourceType: "bread",
  },
  {
    name: "Royal Rooster",
    score: 8,
    resourceBonus: 2,
    resourceType: "chicken",
  },
];

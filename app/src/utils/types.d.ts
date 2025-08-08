export const Resource = {
  Apple: "apple",
  Bread: "bread",
  Cheese: "Cheese",
  Chicken: "Chicken",
  Contraband: "Contraband",
  Coin: "Coin",
};

export type ResourceType = (typeof Resource)[keyof typeof Resource];

export interface Player {
  name: string;
  apple: number;
  bread: number;
  cheese: number;
  chicken: number;
  contraband: number;
  coin: number;
}

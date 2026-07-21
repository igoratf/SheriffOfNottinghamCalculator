export type ResourceName =
  | "apple"
  | "bread"
  | "cheese"
  | "chicken"
  | "coins"
  | "contraband";

export type KingQueenResourceName = Exclude<
  ResourceName,
  "coins" | "contraband"
>;

export interface Contraband {
  name: string;
  score: number;
  resourceBonus?: number;
  resourceType?: ResourceName;
}

export interface PlayerContraband extends Contraband {
  quantity: number;
  totalScore?: number;
}

export interface Player {
  name: string;
  apple: number;
  bread: number;
  cheese: number;
  chicken: number;
  contrabands: PlayerContraband[];
  coins: number;
}

export interface PlayerScore extends Player {
  id: number;
  appleScore: number;
  breadScore: number;
  cheeseScore: number;
  chickenScore: number;
  king: KingQueenResourceName[];
  queen: KingQueenResourceName[];
  score: number;
}

export interface Match {
  id: number;
  createdAt: string;
  totalScore: number;
  players: PlayerScore[];
}

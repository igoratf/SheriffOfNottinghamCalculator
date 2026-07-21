export enum ResourceEnum {
  APPLE = "apple",
  BREAD = "bread",
  CHEESE = "cheese",
  CHICKEN = "chicken",
}

export type ResourceName =
  | "apple"
  | "bread"
  | "cheese"
  | "chicken"
  | "coin"
  | "contraband";

export type KingQueenResourceName = Exclude<
  ResourceName,
  "coin" | "contraband"
>;

export interface Contraband {
  id: number;
  name: string;
  score: number;
  resourceBonus?: number;
  resourceType?: ResourceName;
}

export interface PlayerContraband extends Contraband {
  quantity: number;
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
  king: KingQueenResourceName[];
  queen: KingQueenResourceName[];
  totalScore: number;
}

export interface KingsAndQueens {
  kings: Record<KingQueenResourceName, Player[]>;
  queens: Record<KingQueenResourceName, Player[]>;
}

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
  name: string;
  score: number;
  resourceBonus?: number;
  resourceType?: ResourceName;
}

export interface PlayerContraband {
  contraband: Contraband;
  quantity: number;
}

export interface Player {
  name: string;
  apple: number;
  bread: number;
  cheese: number;
  chicken: number;
  contraband: number; // Keep for backward compatibility
  contrabands: PlayerContraband[]; // New detailed contraband system
  coin: number;
}

export interface PlayerScore {
  apple: number;
  bread: number;
  cheese: number;
  chicken: number;
  coin: number;
  contraband: number;
  total: number;
}

export interface KingsAndQueens {
  kings: Record<KingQueenResourceName, Player[]>;
  queens: Record<KingQueenResourceName, Player[]>;
}

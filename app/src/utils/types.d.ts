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

export interface Player {
  name: string;
  apple: number;
  bread: number;
  cheese: number;
  chicken: number;
  contraband: number;
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

export const GOODS_SCORES = {
  apple: 2,
  bread: 3,
  cheese: 3,
  chicken: 4,
};

export const KINGS_BONUS = {
  apple: 20,
  bread: 15,
  cheese: 15,
  chicken: 10,
};

export const QUEENS_BONUS = {
  apple: 10,
  bread: 10,
  cheese: 10,
  chicken: 5,
};

enum Contraband {
  PEPPER,
  MEAD,
  SILK,
  CROSSBOW,
  GREEN_APPLES,
  GOLDEN_APPLES,
  GOUDA_CHEESE,
  BLEU_CHEESE,
  RYE_BREAD,
  PUMPERNICKEL_BREAD,
  ROYAL_ROOSTER,
}

export const CONTRABAND_SCORE: Record<keyof typeof Contraband, number> = {
  PEPPER: 6,
  MEAD: 7,
  SILK: 8,
  CROSSBOW: 9,
  GREEN_APPLES: 4,
  GOLDEN_APPLES: 6,
  GOUDA_CHEESE: 6,
  BLEU_CHEESE: 9,
  RYE_BREAD: 6,
  PUMPERNICKEL_BREAD: 9,
  ROYAL_ROOSTER: 8,
};

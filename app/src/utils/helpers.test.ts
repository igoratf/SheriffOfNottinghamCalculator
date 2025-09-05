import {
  calculateKingsAndQueens,
  calculatePlayerScore,
  calculateScore,
} from "./helpers";
import { describe, test, expect } from "vitest";

const player1 = {
  name: "Player 1",
  apple: 2,
  bread: 2,
  cheese: 2,
  chicken: 2,
  coin: 2,
  contrabands: [],
};

const player2 = {
  name: "Player 2",
  apple: 1,
  bread: 1,
  cheese: 1,
  chicken: 1,
  coin: 1,
  contrabands: [],
};

const breadKing = {
  name: "Bread king",
  apple: 1,
  bread: 15,
  cheese: 2,
  chicken: 2,
  coin: 1,
  contrabands: [],
};

const cheeseKing = {
  name: "Cheese king",
  apple: 1,
  bread: 8,
  cheese: 15,
  chicken: 2,
  coin: 1,
  contrabands: [],
};

describe("calculate player score", () => {
  test("calculate a player score with all resources", () => {
    const player = player1;

    const expected = {
      apple: 4,
      bread: 6,
      chicken: 8,
      cheese: 6,
      coin: 2,
      contraband: 0,
      total: 26,
    };
    expect(calculatePlayerScore(player)).toEqual(expected);
  });

  test("calculate a player score with no resources", () => {
    const player = {
      name: "Player",
      apple: 0,
      bread: 0,
      chicken: 0,
      cheese: 0,
      coin: 0,
      contrabands: [],
    };

    const expected = {
      apple: 0,
      bread: 0,
      chicken: 0,
      cheese: 0,
      coin: 0,
      contraband: 0,
      total: 0,
    };
    expect(calculatePlayerScore(player)).toEqual(expected);
  });
});

test("calculate kings and queens", () => {
  const players = [player1, player2, breadKing];

  const expected = {
    kings: {
      apple: [player1],
      bread: [breadKing],
      chicken: [player1, breadKing],
      cheese: [player1, breadKing],
    },
    queens: {
      apple: [player2, breadKing],
      bread: [player1],
      chicken: [],
      cheese: [],
    },
  };

  expect(calculateKingsAndQueens(players)).toEqual(expected);
});

describe("calculate match score", () => {
  test("calculate a match score", () => {
    const players = [player1, breadKing, cheeseKing, player2];
    const expected = {
      "Bread king": {
        apple: 2,
        bread: 45,
        cheese: 6,
        chicken: 8,
        coin: 1,
        contraband: 0,
        total: 85,
      },
      "Cheese king": {
        apple: 2,
        bread: 24,
        cheese: 45,
        chicken: 8,
        coin: 1,
        contraband: 0,
        total: 113,
      },
      "Player 1": {
        apple: 4,
        bread: 6,
        cheese: 6,
        chicken: 8,
        coin: 2,
        contraband: 0,
        total: 61,
      },
      "Player 2": {
        apple: 2,
        bread: 3,
        cheese: 3,
        chicken: 4,
        coin: 1,
        contraband: 0,
        total: 16,
      },
    };
    expect(calculateScore(players)).toEqual(expected);
  });
});

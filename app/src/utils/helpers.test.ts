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
  chicken: 2,
  cheese: 2,
  coin: 2,
  contraband: 5,
};

const player2 = {
  name: "Player 2",
  apple: 1,
  bread: 1,
  chicken: 1,
  cheese: 1,
  coin: 1,
  contraband: 1,
};

const player3 = {
  name: "Player 2",
  apple: 1,
  bread: 2,
  chicken: 3,
  cheese: 4,
  coin: 5,
  contraband: 5,
};

const breadKing = {
  name: "Bread king",
  apple: 1,
  bread: 10,
  chicken: 2,
  cheese: 2,
  coin: 1,
  contraband: 1,
};

const cheeseKing = {
  name: "Cheese king",
  apple: 1,
  bread: 10,
  chicken: 2,
  cheese: 20,
  coin: 1,
  contraband: 1,
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
      contraband: 5,
      total: 31,
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
      contraband: 0,
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
    expect(calculateScore(players)).toEqual({});
  });
});

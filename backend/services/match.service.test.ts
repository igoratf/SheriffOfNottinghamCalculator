import { test, describe } from "node:test";
import assert, { match } from "node:assert";
import {
  calculateGoodsScore,
  calculateKingsAndQueens,
} from "./match.service.js";
import type { Player } from "../types.js";

const player = {
  name: "Harry Potter",
  apple: 2,
  bread: 2,
  cheese: 1,
  chicken: 11,
  coins: 50,
  contrabands: [],
  king: [],
  queen: [],
  totalScore: 0,
};

const player2 = {
  name: "Hermione Granger",
  apple: 10,
  bread: 10,
  cheese: 2,
  chicken: 10,
  coins: 51,
  contrabands: [],
  king: [],
  queen: [],
  totalScore: 0,
};

const player3 = {
  name: "Rony Weasley",
  apple: 1,
  bread: 5,
  cheese: 3,
  chicken: 2,
  coins: 40,
  contrabands: [],
  king: [],
  queen: [],
  totalScore: 0,
};

describe("match service", () => {
  describe("calculate goods score", () => {
    test("calculate goods score without contrabands", () => {
      const expected = {
        ...player,
        totalScore: 107,
        king: [],
        queen: [],
      };

      assert.deepStrictEqual([expected], calculateGoodsScore([player]));
    });

    test("calculate goods score with contrabands", () => {
      const playerWithContrabands: Player = {
        ...player,
        contrabands: [
          {
            id: 1,
            name: "Golden Apple",
            quantity: 1,
            score: 4,
            resourceType: "apple",
            resourceBonus: 2,
          },
          {
            id: 2,
            name: "Gouda Cheese",
            quantity: 1,
            score: 4,
            resourceType: "cheese",
            resourceBonus: 2,
          },
        ],
      };

      const expected = {
        ...playerWithContrabands,
        totalScore: 115,
      };

      assert.deepStrictEqual(
        [expected],
        calculateGoodsScore([playerWithContrabands]),
      );
    });
  });

  describe("calculate kigns and queens", () => {
    test("calculate kings and queens with no tie", () => {
      const matchPlayers = [player, player2, player3];

      const expected = {
        kings: {
          apple: [player2],
          bread: [player2],
          cheese: [player3],
          chicken: [player],
        },
        queens: {
          apple: [player],
          bread: [player3],
          cheese: [player2],
          chicken: [player2],
        },
      };

      assert.deepStrictEqual(expected, calculateKingsAndQueens(matchPlayers));
    });

    test("calculate kings and queens with tie", () => {
      const matchPlayers = [player, player2, player3];
      const matchPlayersTied = matchPlayers.map((player) => ({
        ...player,
        apple: 5,
        bread: 5,
        cheese: 5,
        chicken: 5,
      }));

      const expected = {
        kings: {
          apple: matchPlayersTied,
          bread: matchPlayersTied,
          cheese: matchPlayersTied,
          chicken: matchPlayersTied,
        },
        queens: {
          apple: [],
          bread: [],
          cheese: [],
          chicken: [],
        },
      };

      assert.deepStrictEqual(
        expected,
        calculateKingsAndQueens(matchPlayersTied),
      );
    });
  });
});

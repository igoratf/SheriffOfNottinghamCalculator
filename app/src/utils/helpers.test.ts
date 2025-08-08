import { calculatePlayerScore } from "./helpers";
import { describe, test, expect } from "vitest";

describe("calculate player score", () => {
  test("calculate a player score with all resources", () => {
    const player = {
      name: "Player",
      apple: 2,
      bread: 2,
      chicken: 2,
      cheese: 2,
      coin: 2,
      contraband: 5,
    };

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

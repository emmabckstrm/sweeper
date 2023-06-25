import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
  initGameBoard,
  positionExistsInArray,
  generateBombPositions,
  getAdjacentSquares,
} from "./setup";
import type { SquareStatus, GameBoard } from "./types";

const verifyFalsyValueForKey = (
  key: keyof SquareStatus,
  gameBoard: GameBoard
) => {
  let amount = 0;
  gameBoard.map((row) => {
    row.map((square) => {
      if (square[key]) {
        amount += 1;
      }
    });
  });

  return amount;
};

describe("initGameBoard", () => {
  const gameBoard = initGameBoard(2, 5);

  it("sets the game board dimensions correctly", () => {
    expect(gameBoard.length).toEqual(5);
    expect(gameBoard[0].length).toEqual(2);
  });

  it("sets all to not open", () => {
    let numberOfOpens = 0;
    gameBoard.map((row) => {
      row.map((square) => {
        if (square.status === "unopened") {
          numberOfOpens += 1;
        }
      });
    });

    expect(numberOfOpens).toEqual(10);
  });
  it("sets all to not bombs", () => {
    const numberOfBombs = verifyFalsyValueForKey("isBomb", gameBoard);
    expect(numberOfBombs).toEqual(0);
  });
  it("sets all adjacent bombs to 0", () => {
    const numberOfAdjacents = verifyFalsyValueForKey(
      "adjacentBombs",
      gameBoard
    );
    expect(numberOfAdjacents).toEqual(0);
  });

  it("makes sure every row has the same number of columns", () => {});
});

describe(positionExistsInArray, () => {
  it("returns true if position exist", () => {
    expect(
      positionExistsInArray(
        [1, 2],
        [
          [2, 2],
          [1, 2],
          [3, 3],
        ]
      )
    ).toEqual(true);
  });

  it("returns false if position does not exist", () => {
    expect(positionExistsInArray([9, 4], [[4, 9]])).toEqual(false);
  });
  it("returns false if comparison array is empty", () => {
    expect(positionExistsInArray([9, 4], [])).toEqual(false);
  });
});

describe(generateBombPositions, () => {
  it("returns array with bomb positions", () => {
    expect(generateBombPositions(4, 4, 2, []).length).toEqual(2);
  });

  it("throws error if there are too many bombs to be placed", () => {
    expect(() => {
      generateBombPositions(3, 3, 10, []);
    }).toThrow("too many");
  });
  it("throws error if there are too many bombs to be placed after reserved positions are calculatade", () => {
    expect(() => {
      generateBombPositions(3, 3, 7, [
        [0, 0],
        [1, 2],
        [1, 1],
      ]);
    }).toThrowError();
  });
  it("throws error if there are no more free spots for bombs", () => {});

  it("does not place bombs on reserved position(s)", () => {});
});

describe("calculateAdjacentBombs", () => {
  it("takes a game board with bombs and returns an array of squares to update adjacentBomb value", () => {});
});

describe(getAdjacentSquares, () => {
  const board = initGameBoard(4, 4);

  it("returns correct squares for top left position", () => {
    const adjacents = getAdjacentSquares(0, 0, board);
    expect(adjacents.length).toEqual(3);
    expect(adjacents[0][0]).toEqual(0);
    expect(adjacents[0][1]).toEqual(1);
    expect(adjacents[1][0]).toEqual(1);
    expect(adjacents[1][1]).toEqual(0);
  });

  it("returns correct adjacent squares for central positoin", () => {
    const adjacents = getAdjacentSquares(1, 1, board);
    expect(adjacents.length).toEqual(8);
    expect(adjacents[0][0]).toEqual(0);
    expect(adjacents[0][1]).toEqual(0);
    expect(adjacents[adjacents.length - 1][0]).toEqual(2);
    expect(adjacents[adjacents.length - 1][1]).toEqual(2);
  });

  it("returns correct adjacent squares for right side middle positoin", () => {
    const adjacents = getAdjacentSquares(1, 3, board);
    expect(adjacents.length).toEqual(5);
  });

  it("returns correct adjacent squares for botom middle positoin", () => {
    const adjacents = getAdjacentSquares(3, 2, board);
    expect(adjacents.length).toEqual(5);
  });

  it("returns correct adjacent squares for bottom right positoin", () => {
    const adjacents = getAdjacentSquares(3, 3, board);
    expect(adjacents.length).toEqual(3);
  });
});

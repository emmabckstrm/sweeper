import {
  initGameBoard,
  positionExistsInArray,
  generateBombPositions,
  getAdjacentSquares,
} from "./setup";
import {
  getBoardWithOpenedSquares,
  getNumberOfOpenSquares,
  setAllSquaresToOpen,
} from "./gamePlay";

const mockGameBoard = () => {
  const gameBoard = initGameBoard(3, 3);
  gameBoard[0][0] = { ...gameBoard[0][0], isBomb: true };
  const adjacents = getAdjacentSquares(0, 0, gameBoard);
  adjacents.forEach((adjacent) => {
    gameBoard[adjacent[0]][adjacent[1]] = {
      ...gameBoard[adjacent[0]][adjacent[1]],
      adjacentBombs: 1,
    };
  });
  return gameBoard;
};

describe(getBoardWithOpenedSquares, () => {
  const gameBoard = mockGameBoard();

  it("only opens one if it has adjacentBombs number", () => {
    expect(getBoardWithOpenedSquares(0, 1, gameBoard)).toMatchSnapshot();
  });

  it("opens all adjacent empty and adjacent with adjacentBombs number", () => {
    expect(getBoardWithOpenedSquares(2, 2, gameBoard)).toMatchSnapshot();
  });

  it("doesn't open flagged squares", () => {
    gameBoard[0][2].status = "flag";
    expect(getBoardWithOpenedSquares(2, 2, gameBoard)).toMatchSnapshot();
  });
});

describe(setAllSquaresToOpen, () => {
  const gameBoard = mockGameBoard();

  it("opens all squares and sets flagged to false", () => {
    gameBoard[0][2].status = "flag";
    expect(setAllSquaresToOpen(gameBoard)).toMatchSnapshot();
  });
});

describe(getNumberOfOpenSquares, () => {
  it("returns 0 when no squares are open", () => {
    const gameBoard = mockGameBoard();
    expect(getNumberOfOpenSquares(gameBoard)).toEqual(0);
  });

  it("returns 3 when 3 squares are open", () => {
    const gameBoard = mockGameBoard();
    gameBoard[0][1] = { ...gameBoard[0][1], status: "open" };
    gameBoard[2][0] = { ...gameBoard[2][0], status: "open" };
    gameBoard[2][2] = { ...gameBoard[2][2], status: "open" };
    expect(getNumberOfOpenSquares(gameBoard)).toEqual(3);
  });
});

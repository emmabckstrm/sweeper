import {
  initGameBoard,
  positionExistsInArray,
  generateBombPositions,
  getAdjacentSquares,
} from "./setup";
import { getBoardWithOpenedSquares } from "./gamePlay";

describe(getBoardWithOpenedSquares, () => {
  const gameBoard = initGameBoard(3, 3);
  gameBoard[0][0] = { ...gameBoard[0][0], isBomb: true };
  const adjacents = getAdjacentSquares(0, 0, gameBoard);
  adjacents.forEach((adjacent) => {
    gameBoard[adjacent[0]][adjacent[1]] = {
      ...gameBoard[adjacent[0]][adjacent[1]],
      adjacentBombs: 1,
    };
  });

  it("only opens one if it has adjacentBombs number", () => {
    expect(getBoardWithOpenedSquares(0, 1, gameBoard)).toMatchSnapshot();
  });

  it("opens all adjacent empty and adjacent with adjacentBombs number", () => {
    expect(getBoardWithOpenedSquares(2, 2, gameBoard)).toMatchSnapshot();
  });

  it("doesn't open flagged squares", () => {
    gameBoard[0][2].isFlagged = true;
    expect(getBoardWithOpenedSquares(2, 2, gameBoard)).toMatchSnapshot();
  });
});

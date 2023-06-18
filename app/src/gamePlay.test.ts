import {
  initGameBoard,
  positionExistsInArray,
  generateBombPositions,
  getAdjacentSquares,
} from "./setup";
import { getBoardWithOpenedSquares } from "./gamePlay";

describe("getSquaresToOpen", () => {
  const gameBoard = initGameBoard(3, 3);
  gameBoard[0][0] = { ...gameBoard[0][0], isBomb: true };
  const adjacents = getAdjacentSquares(0, 0, gameBoard);
  adjacents.forEach((adjacent) => {
    gameBoard[adjacent[0]][adjacent[1]] = {
      ...gameBoard[adjacent[0]][adjacent[1]],
      adjacentBombs: 1,
    };
  });
  console.log("game", gameBoard);

  it("returns one square when clicking one", () => {
    const f = getBoardWithOpenedSquares(0, 1, gameBoard);
    console.log("hejjjj", f);
    expect(f).toMatchSnapshot();
  });
  it("returns all adjacent unopened ones", () => {
    const f = getBoardWithOpenedSquares(2, 2, gameBoard);
    console.log("hejjjj", f);
    expect(f).toMatchSnapshot();
  });
});

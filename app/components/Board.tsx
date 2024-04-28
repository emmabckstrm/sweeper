import type { ChangeEvent, PropsWithChildren, ReactNode } from "react";
import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import type { GameState } from "../src/types";
import { BoardLayout } from "./BoardLayout";
import { HeaderLayout } from "./HeaderLayout";

const DEFAULTS: Record<
  "beginner" | "intermediate" | "expert",
  {
    rows: number;
    cols: number;
    bombs: number;
  }
> = {
  beginner: {
    rows: 10,
    cols: 10,
    bombs: 10,
  },
  intermediate: {
    rows: 15,
    cols: 15,
    bombs: 40,
  },
  expert: {
    rows: 16,
    cols: 30,
    bombs: 99,
  },
};

export const Board = ({
  children,
  gameState,
  handleOnGameStart,
  handleOnGameReset,
}: PropsWithChildren<{
  gameState: GameState;
  handleOnGameReset: () => void;
  handleOnGameStart: (rows: number, cols: number, bombs: number) => void;
}>) => {
  const [numberOfRows, setNumberOfRows] = useState(10);
  const [numberOfCols, setNumberOfCols] = useState(10);
  const [numberOfBombs, setNumberOfBombs] = useState(10);

  return (
    <BoardLayout Header={<HeaderLayout Title={"Sweeper"} />}>
      {gameState === "idle" && (
        <>
          <div className="flex flex-col items-center flex-nowrap space-y-2">
            {Object.entries(DEFAULTS).map(([key, item]) => {
              return (
                <div key={key} className="flex flex-col items-center">
                  <Button
                    className="capitalize"
                    onClick={() =>
                      handleOnGameStart(item.rows, item.cols, item.bombs)
                    }
                  >
                    {key}
                  </Button>
                  <div className="text-xs text-purple-800 italic">{` (${item.rows} x ${item.cols}, ${item.bombs})`}</div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col space-y-2 items-end sm:space-y-0 sm:flex-row sm:flex-nowrap sm:space-x-2 sm:items-start">
            {[
              { key: "rows", value: numberOfRows, setter: setNumberOfRows },
              { key: "cols", value: numberOfCols, setter: setNumberOfCols },
              { key: "bombs", value: numberOfBombs, setter: setNumberOfBombs },
            ].map((item) => {
              const { key, value, setter } = item;
              return (
                <div
                  key={key}
                  className="flex flex-row items-center space-x-2 sm:space-x-0 sm:flex-col-reverse"
                >
                  <span className="text-center text-sm">{key}</span>
                  <Input
                    disabled={gameState !== "idle"}
                    value={value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setter(Number(event.target.value))
                    }
                  />
                </div>
              );
            })}
            <div className="w-full text-center">
              <Button
                className="h-10"
                onClick={() =>
                  handleOnGameStart(numberOfRows, numberOfCols, numberOfBombs)
                }
              >
                Custom
              </Button>
            </div>
          </div>
        </>
      )}
      <div className="w-full">
        {gameState !== "idle" && (
          <div className="overflow-auto w-full p-2">{children}</div>
        )}
      </div>

      {gameState === "win" && <div>You won!</div>}
      {gameState === "loss" && <div>You lost!</div>}
      {(gameState === "loss" || gameState === "win") && (
        <Button onClick={handleOnGameReset}>Play again</Button>
      )}
    </BoardLayout>
  );
};

import { ReactNode } from "react";

interface Props {
  Title?: ReactNode;
  LeftElement?: ReactNode;
  CenterElement?: ReactNode;
  RightElement?: ReactNode;
}

export const HeaderLayout = ({
  Title = "sweeper",
  LeftElement,
  CenterElement,
  RightElement,
}: Props) => {
  return (
    <header className="w-full bg-purple-400 text-white flex flex-col p-2">
      <h1 className="text-center font-bold text-3xl font-mono">{Title}</h1>

      <div className="flex flex-row gap-2">
        <div className="flex-1 text-left">{LeftElement}</div>
        <div className=" ">{CenterElement}</div>
        <div className="flex-1 text-right">{RightElement}</div>
      </div>
    </header>
  );
};

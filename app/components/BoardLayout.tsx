import { PropsWithChildren, ReactNode } from "react";

export const BoardLayout = ({
  Header,
  children,
}: PropsWithChildren<{ Header?: ReactNode }>) => {
  return (
    <div
      className={`w-full sm:w-auto inline-flex min-w-[150px] min-h-[250px]
                  flex-col 
                  overflow-hidden
                  bg-purple-100 rounded-md shadow-md
                  space-y-5
                `}
    >
      <header className="w-full">{Header}</header>
      <main
        className={`w-full inline-flex items-center justify-center
        flex-col space-y-5 px-4 pb-4
                `}
      >
        {children}
      </main>
    </div>
  );
};

import type { ReactNode, MouseEventHandler } from "react";

export const Button = ({
  children,
  className,
  onClick,
}: {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-purple-400 border-purple-600 border 
            inline-flex items-center px-3 py-2 rounded-md shadow-sm
            hover:bg-purple-500 hover:border-purple-700
         ${className}`}
    >
      {children}
    </button>
  );
};

import { type ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export const TableRow = ({ children, className = "" }: TableRowProps) => {
  const baseClasses =
    "transition-colors hover:bg-gray-50 dark:hover:bg-gray-700";

  return <tr className={`${baseClasses} ${className}`}>{children}</tr>;
};

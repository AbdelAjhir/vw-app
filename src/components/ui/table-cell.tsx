import { type ReactNode } from "react";

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export const TableCell = ({ children, className = "" }: TableCellProps) => {
  const baseClasses =
    "border border-gray-300 p-2 dark:border-gray-600 dark:text-white";

  return <td className={`${baseClasses} ${className}`}>{children}</td>;
};

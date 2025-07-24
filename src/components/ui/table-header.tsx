import { type ReactNode } from "react";

interface TableHeaderProps {
  children: ReactNode;
  onClick?: () => void;
  sortField?: string;
  currentSortField?: string;
  sortOrder?: "asc" | "desc";
  className?: string;
}

export const TableHeader = ({
  children,
  onClick,
  sortField,
  currentSortField,
  sortOrder = "asc",
  className = "",
}: TableHeaderProps) => {
  const baseClasses =
    "cursor-pointer border border-gray-300 p-2 text-left transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700";

  return (
    <th className={`${baseClasses} ${className}`} onClick={onClick}>
      <div className="flex items-center gap-1">
        {children}
        {sortField && currentSortField === sortField && (
          <span className="text-blue-600 dark:text-blue-400">
            {sortOrder === "asc" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </th>
  );
};

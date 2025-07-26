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
    "text-sm sm:text-base cursor-pointer border border-gray-300 p-2 text-left transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700";

  const isSortable = !!onClick;
  const isSorted = sortField && currentSortField === sortField;

  const sortDirection = isSorted ? sortOrder : undefined;
  const ariaSort =
    sortDirection === "asc"
      ? "ascending"
      : sortDirection === "desc"
        ? "descending"
        : "none";

  return (
    <th
      aria-sort={isSortable ? ariaSort : undefined}
      className={`${baseClasses} ${className}`}
      scope="col"
      tabIndex={isSortable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isSortable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      <div className="flex items-center gap-1">
        {children}
        {isSorted && (
          <span
            aria-label={`Sorted ${sortOrder === "asc" ? "ascending" : "descending"}`}
            className="text-blue-600 dark:text-blue-400"
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </th>
  );
};

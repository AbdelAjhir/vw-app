import { memo } from "react";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (_query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = memo(
  ({ searchQuery, onSearchChange, placeholder, className }: SearchBarProps) => {
    const searchId = "movie-search";

    return (
      <div className={`relative ${className}`}>
        <label className="sr-only" htmlFor={searchId}>
          Search movies
        </label>
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-600 dark:text-gray-300" />
        <input
          aria-label="Search movies by title, date, rating, popularity, or language"
          className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
          id={searchId}
          placeholder={placeholder}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            aria-label="Clear search"
            className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
            type="button"
            onClick={() => onSearchChange("")}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

import { useState, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import { Eye, Edit, Trash2 } from "lucide-react";

import SearchBar from "@/components/SearchBar";
import { formatDate } from "@/helpers";
import type { Movie } from "@/types/movie";

interface MovieTableProps {
  movies: Movie[];
  onEdit: (_movie: Movie) => void;
  onDelete: (_movieId: number) => void;
}

export const SimpleMovieTable = ({
  movies,
  onEdit,
  onDelete,
}: MovieTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  // Universal search across only visible fields
  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) {
      return movies;
    }

    const query = searchQuery.toLowerCase().trim();

    return movies.filter((movie) => {
      // Only search fields that are actually shown in the table
      const searchableFields = {
        title: movie.title,
        language: movie.original_language,
        rating: movie.vote_average.toString(),
        release_date: formatDate(movie.release_date),
        family: movie.adult ? "adult" : "family",
      };

      // Also search the original date format for better date searching
      const originalDate = movie.release_date;

      return (
        Object.values(searchableFields).some((value) =>
          value.toLowerCase().includes(query)
        ) || originalDate.toLowerCase().includes(query)
      );
    });
  }, [movies, searchQuery]);

  // Client side sorting
  const sortedMovies = useMemo(() => {
    if (!sortField) {
      return filteredMovies;
    }

    return [...filteredMovies].sort((a, b) => {
      const aValue = a[sortField as keyof Movie];
      const bValue = b[sortField as keyof Movie];

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredMovies, sortField, sortOrder]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-4">
      {/* Global Search Bar */}
      <SearchBar
        placeholder="Search movies by title, language, rating, date..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Simple HTML Table */}
      <div className="rounded-md border border-gray-300 dark:border-gray-600">
        <div className="overflow-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th
                  className="cursor-pointer border border-gray-300 p-2 text-left transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center gap-1">
                    Title
                    {sortField === "title" && (
                      <span className="text-blue-600 dark:text-blue-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="cursor-pointer border border-gray-300 p-2 text-left transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                  onClick={() => handleSort("release_date")}
                >
                  <div className="flex items-center gap-1">
                    Release Date
                    {sortField === "release_date" && (
                      <span className="text-blue-600 dark:text-blue-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="cursor-pointer border border-gray-300 p-2 text-left transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                  onClick={() => handleSort("vote_average")}
                >
                  <div className="flex items-center gap-1">
                    Rating
                    {sortField === "vote_average" && (
                      <span className="text-blue-600 dark:text-blue-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="cursor-pointer border border-gray-300 p-2 text-left transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                  onClick={() => handleSort("original_language")}
                >
                  <div className="flex items-center gap-1">
                    Language
                    {sortField === "original_language" && (
                      <span className="text-blue-600 dark:text-blue-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="cursor-pointer border border-gray-300 p-2 text-left transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                  onClick={() => handleSort("adult")}
                >
                  <div className="flex items-center gap-1">
                    Type
                    {sortField === "adult" && (
                      <span className="text-blue-600 dark:text-blue-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th className="border border-gray-300 p-2 text-left dark:border-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedMovies.map((movie) => (
                <tr
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                  key={movie.id}
                >
                  <td className="border border-gray-300 p-2 dark:border-gray-600 dark:text-white">
                    {movie.title}
                  </td>
                  <td className="border border-gray-300 p-2 dark:border-gray-600 dark:text-white">
                    {formatDate(movie.release_date)}
                  </td>
                  <td className="border border-gray-300 p-2 dark:border-gray-600 dark:text-white">
                    {movie.vote_average.toFixed(1)} ⭐
                  </td>
                  <td className="border border-gray-300 p-2 dark:border-gray-600 dark:text-white">
                    {movie.original_language.toUpperCase()}
                  </td>
                  <td className="border border-gray-300 p-2 dark:border-gray-600 dark:text-white">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        movie.adult
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {movie.adult ? "Adult" : "Family"}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-2 dark:border-gray-600">
                    <button
                      className="mr-2 rounded bg-green-500 px-2 py-1 text-white transition-colors hover:bg-green-600"
                      type="button"
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                      <Eye className="mr-1 inline h-3 w-3" />
                      View
                    </button>
                    <button
                      className="mr-2 rounded bg-blue-500 px-2 py-1 text-white transition-colors hover:bg-blue-600"
                      type="button"
                      onClick={() => onEdit(movie)}
                    >
                      <Edit className="mr-1 inline h-3 w-3" />
                      Edit
                    </button>
                    <button
                      className="rounded bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600"
                      type="button"
                      onClick={() => onDelete(movie.id)}
                    >
                      <Trash2 className="mr-1 inline h-3 w-3" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results */}
      {sortedMovies.length === 0 && searchQuery && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          No results found.
        </div>
      )}
    </div>
  );
};

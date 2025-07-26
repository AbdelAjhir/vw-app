import { useState, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import { Eye, Edit, Trash2 } from "lucide-react";

import { ActionButton } from "@/components/ui/action-button";
import { SearchBar } from "@/components/ui/search-bar";
import { TableCell } from "@/components/ui/table-cell";
import { TableHeader } from "@/components/ui/table-header";
import { TableRow } from "@/components/ui/table-row";
import { TABLE_COLUMNS } from "@/constants/table";
import { formatDate } from "@/helpers";
import type { Movie } from "@/types/movie";

interface MovieTableProps {
  movies: Movie[];
  onEdit: (_movie: Movie) => void;
  onDelete: (_movieId: number) => void;
}

const SimpleMovieTable = ({ movies, onEdit, onDelete }: MovieTableProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Global search across only visible fields
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
        popularity: movie.popularity.toString(),
      };

      return Object.values(searchableFields).some((value) =>
        value.toLowerCase().includes(query)
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

      // Use localeCompare for string fields
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // For numeric fields
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
        placeholder="Search movies by title, date, rating, popularity, language..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Simple HTML Table */}
      <div className="rounded-md border border-gray-300 dark:border-gray-600">
        <div className="overflow-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                {TABLE_COLUMNS.map(({ field, label }) => (
                  <TableHeader
                    currentSortField={sortField}
                    key={field}
                    sortField={field}
                    sortOrder={sortOrder}
                    onClick={() => handleSort(field)}
                  >
                    {label}
                  </TableHeader>
                ))}
                <th className="border border-gray-300 p-2 text-center text-sm sm:text-base dark:border-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedMovies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{formatDate(movie.release_date)}</TableCell>
                  <TableCell>⭐{movie.vote_average.toFixed(1)} </TableCell>
                  <TableCell>{Math.floor(movie.popularity)}</TableCell>
                  <TableCell>{movie.original_language.toUpperCase()}</TableCell>

                  <TableCell className="align-center">
                    <div className="flex items-center justify-center gap-2">
                      <ActionButton
                        variant="view"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                      >
                        <Eye className="mr-1 inline h-3 w-3" />
                        View
                      </ActionButton>
                      <ActionButton
                        variant="edit"
                        onClick={() => onEdit(movie)}
                      >
                        <Edit className="mr-1 inline h-3 w-3" />
                        Edit
                      </ActionButton>
                      <ActionButton
                        variant="delete"
                        onClick={() => onDelete(movie.id)}
                      >
                        <Trash2 className="mr-1 inline h-3 w-3" />
                        Delete
                      </ActionButton>
                    </div>
                  </TableCell>
                </TableRow>
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

export default SimpleMovieTable;

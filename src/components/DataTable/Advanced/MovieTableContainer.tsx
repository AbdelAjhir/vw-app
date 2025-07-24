import { useState, useEffect, useMemo } from "react";

import { Plus, AlertTriangle } from "lucide-react";

import MovieForm from "@/components/MovieForm/MovieForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useGetMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} from "@/store/movieApi";
import type { Movie } from "@/types/movie";

import { MovieTable } from "./MovieTable";
import { createColumns } from "./MovieTableColumns";

const AdvancedMovieTableContainer = () => {
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // Table state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // API query parameters
  const queryParams = useMemo(() => {
    const params: any = {
      _page: currentPage,
      _limit: pageSize,
    };

    if (debouncedSearchQuery.trim()) {
      params.q = debouncedSearchQuery.trim();
    }

    if (sortField) {
      params._sort = sortField;
      params._order = sortOrder;
    }

    return params;
  }, [currentPage, pageSize, debouncedSearchQuery, sortField, sortOrder]);

  // API hooks
  const {
    data: moviesResponse,
    isLoading,
    error,
  } = useGetMoviesQuery(queryParams);
  const [createMovie, { isLoading: isCreating }] = useCreateMovieMutation();
  const [updateMovie, { isLoading: isUpdating }] = useUpdateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  // Event handlers
  const handleAddMovie = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleDeleteMovie = async (movieId: number) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(movieId).unwrap();
      } catch (error) {
        console.error("Failed to delete movie:", error);
        alert("Failed to delete movie. Please try again.");
      }
    }
  };

  const handleSubmitMovie = async (movieData: Omit<Movie, "id">) => {
    try {
      if (editingMovie) {
        await updateMovie({ id: editingMovie.id, movie: movieData }).unwrap();
      } else {
        await createMovie(movieData).unwrap();
      }
      setShowForm(false);
      setEditingMovie(null);
    } catch (error) {
      console.error("Failed to save movie:", error);
      alert("Failed to save movie. Please try again.");
    }
  };

  const handleFormClose = (open: boolean) => {
    setShowForm(open);
    if (!open) {
      setEditingMovie(null);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleSortChange = (field: string, order: "asc" | "desc") => {
    setSortField(field);
    setSortOrder(order);
  };

  // Loading and error states
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <p className="text-lg text-red-500">
            Error loading movies. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const movies = moviesResponse?.data || [];
  const totalMovies = moviesResponse?.totalCount || 0;
  const totalPages = Math.ceil(totalMovies / pageSize);

  const columns = createColumns({
    onEdit: handleEditMovie,
    onDelete: handleDeleteMovie,
  });

  return (
    <div className="container mx-auto px-3 py-10">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Movies Database</h1>
          <p className="text-muted-foreground mt-2">
            Browse, search, and manage your movie collection
          </p>
        </div>
        <Button
          className="flex w-full items-center gap-2 sm:w-fit"
          onClick={handleAddMovie}
        >
          <Plus className="h-4 w-4" />
          Add Movie
        </Button>
      </div>

      {/* Table */}
      <MovieTable
        columns={columns}
        currentPage={currentPage}
        data={movies}
        isLoading={isLoading}
        pageSize={pageSize}
        searchQuery={searchQuery}
        sortField={sortField}
        sortOrder={sortOrder}
        totalCount={totalMovies}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={setSearchQuery}
        onSortChange={handleSortChange}
      />

      {/* Movie Form Dialog */}
      <MovieForm
        isLoading={isCreating || isUpdating}
        movie={editingMovie || undefined}
        open={showForm}
        onOpenChange={handleFormClose}
        onSubmit={handleSubmitMovie}
      />
    </div>
  );
};

export default AdvancedMovieTableContainer;

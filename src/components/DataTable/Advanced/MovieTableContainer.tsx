import { useState, useEffect, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import MovieForm from "@/components/MovieForm/MovieForm";
import { LoadingState, ErrorState } from "@/components/ui/loading-error-states";
import { SectionHeader } from "@/components/ui/section-header";
import { showErrorToast, showSuccessToast } from "@/helpers";
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
  const navigate = useNavigate();

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // Table state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Search and sort state
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

  const handleDeleteMovie = async (movieId: number, movieTitle: string) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(movieId).unwrap();
        showSuccessToast("deleted", movieTitle);
      } catch (error) {
        console.error("Failed to delete movie:", error);
        showErrorToast("delete");
      }
    }
  };

  const handleSubmitMovie = async (movieData: Omit<Movie, "id">) => {
    try {
      if (editingMovie) {
        await updateMovie({ id: editingMovie.id, movie: movieData }).unwrap();
        showSuccessToast("updated", movieData.title);
      } else {
        await createMovie(movieData).unwrap();
        showSuccessToast("added", movieData.title);
      }
      setShowForm(false);
      setEditingMovie(null);
    } catch (error) {
      console.error("Failed to save movie:", error);
      showErrorToast("save");
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

  const handleViewMovie = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  // Loading and error states
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  const movies = moviesResponse?.data || [];
  const totalMovies = moviesResponse?.totalCount || 0;
  const totalPages = Math.ceil(totalMovies / pageSize);

  const columns = createColumns({
    onEdit: handleEditMovie,
    onDelete: handleDeleteMovie,
    onView: handleViewMovie,
  });

  return (
    <div className="container mx-auto px-3 py-10">
      {/* Header */}
      <SectionHeader
        description="TanStack Table with server side pagination, sorting, and filtering"
        title="Advanced Movie Table"
        onAddClick={handleAddMovie}
      />

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

import { useState } from "react";

import MovieForm from "@/components/MovieForm/MovieForm";
import { LoadingState, ErrorState } from "@/components/ui/loading-error-states";
import { SectionHeader } from "@/components/ui/section-header";
import { showErrorToast, showSuccessToast } from "@/helpers";
import {
  useGetMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} from "@/store/movieApi";
import type { Movie } from "@/types/movie";

import SimpleMovieTable from "./SimpleMovieTable";

const SimpleMovieTableContainer = () => {
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // Load first 25 movies
  const {
    data: moviesResponse,
    isLoading,
    error,
  } = useGetMoviesQuery({
    _page: 1,
    _limit: 25, // Only load 25 movies for simple table
  });

  // CRUD mutations
  const [createMovie, { isLoading: isCreating }] = useCreateMovieMutation();
  const [updateMovie, { isLoading: isUpdating }] = useUpdateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();

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
        await updateMovie({
          id: editingMovie.id,
          movie: movieData,
        }).unwrap();
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

  // Loading and error states
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="container mx-auto px-3 py-10">
      {/* Header */}
      <SectionHeader
        description="Basic HTML table with client side search and sorting"
        title="Simple Movie Table"
        onAddClick={handleAddMovie}
      />

      {/* Simple Table */}
      <SimpleMovieTable
        movies={moviesResponse?.data || []}
        onDelete={handleDeleteMovie}
        onEdit={handleEditMovie}
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

export default SimpleMovieTableContainer;

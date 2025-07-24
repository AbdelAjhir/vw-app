import { useState, useEffect } from "react";

import { LoadingState, ErrorState } from "@/components/LoadingErrorStates";
import MovieForm from "@/components/MovieForm/MovieForm";
import TableHeader from "@/components/TableHeader";
import {
  useGetMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} from "@/store/movieApi";
import type { Movie } from "@/types/movie";

import { SimpleMovieTable } from "./SimpleMovieTable";

const SimpleMovieTableContainer = () => {
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // Load first 20 movies
  const {
    data: moviesResponse,
    isLoading,
    error,
  } = useGetMoviesQuery({
    _page: 1,
    _limit: 20, // Only load 20 movies for simple table
  });

  // CRUD mutations
  const [createMovie, { isLoading: isCreating }] = useCreateMovieMutation();
  const [updateMovie, { isLoading: isUpdating }] = useUpdateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  // Local state for movies
  const [localMovies, setLocalMovies] = useState<Movie[]>([]);

  // Update local movies when API data changes
  useEffect(() => {
    if (moviesResponse?.data) {
      setLocalMovies(moviesResponse.data);
    }
  }, [moviesResponse?.data]);

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
        // Update local state immediately
        setLocalMovies((prev) => prev.filter((m) => m.id !== movieId));
      } catch (error) {
        console.error("Failed to delete movie:", error);
        alert("Failed to delete movie. Please try again.");
      }
    }
  };

  const handleSubmitMovie = async (movieData: Omit<Movie, "id">) => {
    try {
      if (editingMovie) {
        const result = await updateMovie({
          id: editingMovie.id,
          movie: movieData,
        }).unwrap();
        // Update local state with the updated movie
        setLocalMovies((prev) =>
          prev.map((m) => (m.id === editingMovie.id ? result : m))
        );
      } else {
        const result = await createMovie(movieData).unwrap();
        // Add new movie to local state
        setLocalMovies((prev) => [result, ...prev]);
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
      <TableHeader
        description="Client side table with global search and column sorting"
        title="Simple Movies Table"
        onAddClick={handleAddMovie}
      />

      {/* Simple Table */}
      <SimpleMovieTable
        movies={localMovies}
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

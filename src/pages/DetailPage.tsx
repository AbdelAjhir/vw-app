import { useParams, useNavigate } from "react-router-dom";

import { BackButton, MoviePoster, MovieInfo } from "@/components/Details";
import {
  LoadingState,
  ErrorState,
  NotFoundState,
} from "@/components/ui/loading-error-states";
import { useGetMovieQuery } from "@/store/movieApi";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: movie, isLoading, error } = useGetMovieQuery(Number(id));

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    // Check if it's a 404 error (movie not found)
    if ("status" in error && error.status === 404) {
      return (
        <NotFoundState
          message="The movie you're looking for doesn't exist or has been removed."
          title="Movie Not Found"
        />
      );
    }
    return <ErrorState />;
  }

  if (!movie) {
    return <NotFoundState />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton onClick={() => navigate(-1)} />

      {/* Movie Details */}
      <div className="grid gap-8 lg:grid-cols-3">
        <MoviePoster posterPath={movie.poster_path} title={movie.title} />
        <MovieInfo movie={movie} />
      </div>
    </div>
  );
};

export default DetailPage;

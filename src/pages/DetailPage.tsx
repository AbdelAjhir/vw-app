import { useParams, useNavigate } from "react-router-dom";

import { ArrowLeft, Calendar, Star, Users, Globe, Eye } from "lucide-react";

import {
  LoadingState,
  ErrorState,
  NotFoundState,
} from "@/components/ui/loading-error-states";
import { formatDate } from "@/helpers";
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
      {/* Back Button */}
      <button
        className="mb-6 flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        type="button"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Movies
      </button>

      {/* Movie Details */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Poster */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden rounded-lg shadow-lg">
            {movie.poster_path ? (
              <img
                alt={movie.title}
                className="h-auto w-full object-cover"
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/500x750";
                }}
              />
            ) : (
              <div className="flex h-96 items-center justify-center bg-gray-200 dark:bg-gray-700">
                <span className="text-gray-500 dark:text-gray-400">
                  No Image Available
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Movie Info */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Title and Basic Info */}
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
                {movie.title}
              </h1>
              {movie.original_title !== movie.title && (
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {movie.original_title}
                </p>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Rating
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {movie.vote_average.toFixed(1)}/10
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Votes
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {movie.vote_count.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                <Eye className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Popularity
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {Math.floor(movie.popularity)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                <Globe className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Language
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {movie.original_language.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Release Date */}
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">
                Released: {formatDate(movie.release_date)}
              </span>
            </div>

            {/* Overview */}
            <div>
              <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                Overview
              </h2>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {movie.overview || "No overview available."}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  Content Type
                </h3>
                <div className="flex gap-2">
                  {movie.adult && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                      Adult Content
                    </span>
                  )}
                  {movie.video && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Has Video
                    </span>
                  )}
                  {!movie.adult && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      Family Friendly
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  Movie ID
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{movie.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

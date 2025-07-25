import { Calendar } from "lucide-react";

import { formatDate } from "@/helpers";
import type { Movie } from "@/types/movie";

import { ContentBadges } from "./ContentBadges";
import { MovieStats } from "./MovieStats";

interface MovieInfoProps {
  movie: Movie;
}

export const MovieInfo = ({ movie }: MovieInfoProps) => {
  return (
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
        <MovieStats
          originalLanguage={movie.original_language}
          popularity={movie.popularity}
          voteAverage={movie.vote_average}
          voteCount={movie.vote_count}
        />

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
          <ContentBadges adult={movie.adult} video={movie.video} />

          <div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
              Movie ID
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{movie.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

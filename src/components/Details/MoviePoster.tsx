interface MoviePosterProps {
  posterPath: string | null;
  title: string;
}

export const MoviePoster = ({ posterPath, title }: MoviePosterProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="overflow-hidden rounded-lg shadow-lg">
        {posterPath ? (
          <img
            alt={title}
            className="h-auto w-full object-cover"
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
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
  );
};

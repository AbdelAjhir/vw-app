import { Star, Users, Eye, Globe } from "lucide-react";

interface MovieStatsProps {
  voteAverage: number;
  voteCount: number;
  popularity: number;
  originalLanguage: string;
}

export const MovieStats = ({
  voteAverage,
  voteCount,
  popularity,
  originalLanguage,
}: MovieStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
        <Star className="h-5 w-5 text-yellow-500" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {voteAverage.toFixed(1)}/10
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
        <Users className="h-5 w-5 text-blue-500" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Votes</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {voteCount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
        <Eye className="h-5 w-5 text-green-500" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Popularity</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {Math.floor(popularity)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
        <Globe className="h-5 w-5 text-purple-500" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Language</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {originalLanguage.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

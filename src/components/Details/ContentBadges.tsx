interface ContentBadgesProps {
  adult: boolean;
  video: boolean;
}

export const ContentBadges = ({ adult, video }: ContentBadgesProps) => {
  return (
    <div>
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Content Type
      </h3>
      <div className="flex gap-2">
        {adult && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
            Adult Content
          </span>
        )}
        {video && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Has Video
          </span>
        )}
        {!adult && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            Family Friendly
          </span>
        )}
      </div>
    </div>
  );
};

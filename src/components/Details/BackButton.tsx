import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      className="mb-6 flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      type="button"
      onClick={onClick}
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Movies
    </button>
  );
};

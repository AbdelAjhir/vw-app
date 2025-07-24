import { AlertTriangle, Search } from "lucide-react";

import { NavigationButtons } from "@/components/ui/navigation-buttons";
import { Spinner } from "@/components/ui/spinner";

export const LoadingState = () => (
  <div className="flex items-center justify-center p-8">
    <Spinner />
  </div>
);

interface ErrorStateProps {
  message?: string;
}

export const ErrorState = ({
  message = "Error loading movies. Please try again.",
}: ErrorStateProps) => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
      <p className="text-lg text-red-500">{message}</p>
    </div>
  </div>
);

interface NotFoundStateProps {
  title?: string;
  message?: string;
}

export const NotFoundState = ({
  title = "Not Found",
  message = "The item you're looking for doesn't exist or has been removed.",
}: NotFoundStateProps) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
      <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
        <Search className="h-8 w-8 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">{message}</p>
      </div>

      <NavigationButtons />
    </div>
  );
};

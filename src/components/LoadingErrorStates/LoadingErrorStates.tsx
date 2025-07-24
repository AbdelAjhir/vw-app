import { AlertTriangle } from "lucide-react";

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

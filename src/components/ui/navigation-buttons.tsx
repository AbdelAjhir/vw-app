import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  className?: string;
}

export const NavigationButtons = ({
  className = "",
}: NavigationButtonsProps) => {
  const navigate = useNavigate();

  return (
    <nav aria-label="Navigation" className={`space-x-4 ${className}`}>
      <Button
        aria-label="Go back to previous page"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
      <Button
        aria-label="Go to home page"
        variant="outline"
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </nav>
  );
};

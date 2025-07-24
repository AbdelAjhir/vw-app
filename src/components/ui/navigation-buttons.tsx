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
    <div className={`space-x-4 ${className}`}>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
      <Button variant="outline" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </div>
  );
};

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        className="h-9 w-9 cursor-pointer p-0"
        size="sm"
        variant="ghost"
        onClick={toggleTheme}
      >
        <Sun
          aria-hidden="true"
          className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
        />
        <Moon
          aria-hidden="true"
          className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
        />
        <span className="sr-only">
          {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        </span>
      </Button>
    </div>
  );
};

export default ThemeToggle;

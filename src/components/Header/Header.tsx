import { Link, useLocation } from "react-router-dom";

import { Film } from "lucide-react";

import ThemeToggle from "@/components/ui/theme-toggle";

const Header = () => {
  const location = useLocation();

  return (
    <header className="container mx-auto flex items-center justify-between border-b px-3 py-3">
      <div className="flex items-center gap-6">
        <Link to="/">
          <Film className="h-8 w-8 lg:h-10 lg:w-10" />
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              location.pathname === "/"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            }`}
            to="/"
          >
            Simple Table
          </Link>
          <Link
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              location.pathname === "/advanced"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            }`}
            to="/advanced"
          >
            Advanced Table
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;

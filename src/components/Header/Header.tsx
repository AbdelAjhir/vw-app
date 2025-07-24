import { Link } from "react-router-dom";

import { Film } from "lucide-react";

import ThemeToggle from "@/components/ui/theme-toggle";

const Header = () => {
  return (
    <header className="container mx-auto flex items-center justify-between border-b px-3 py-3">
      <Link to="/">
        <Film className="h-8 w-8 lg:h-10 lg:w-10" />
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;

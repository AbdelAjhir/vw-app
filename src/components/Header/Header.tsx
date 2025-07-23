import { Link } from "react-router-dom";

import { Bookmark, Film } from "lucide-react";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b px-6 py-3 md:mx-20 lg:mx-32">
      <Link to="/">
        <Film className="h-8 w-8 lg:h-10 lg:w-10" />
      </Link>
      <div className="flex items-center gap-2">
        <Button asChild size="icon">
          <Link to="/">
            <Bookmark className="h-4 w-4" />
          </Link>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;

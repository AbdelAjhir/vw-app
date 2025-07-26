import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const AppLayout = () => {
  return (
    <div className="flex min-h-svh flex-col">
      {/* Skip to main content link for keyboard users */}
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
        href="#main-content"
      >
        Skip to main content
      </a>

      <Header />
      <main className="flex-1" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;

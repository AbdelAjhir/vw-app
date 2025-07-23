import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-svh">
      <header className="flex items-center justify-between">
        <h1>Header</h1>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="flex items-center justify-between">
        <h1>Footer</h1>
      </footer>
    </div>
  );
};

export default AppLayout;

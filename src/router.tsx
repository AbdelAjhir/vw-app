import { Suspense, lazy } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Spinner } from "@/components/ui/spinner";
import AppLayout from "@/layouts/AppLayout";

const HomePage = lazy(() => import("@/pages/HomePage"));
const DetailPage = lazy(() => import("@/pages/DetailPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<AppLayout />} path="/">
            <Route index element={<HomePage />} />
            <Route element={<DetailPage />} path="/movie/:id" />
            <Route element={<NotFoundPage />} path="*" />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

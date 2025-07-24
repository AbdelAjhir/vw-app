import { NavigationButtons } from "@/components/ui/navigation-buttons";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-300">404</h1>
        <h2 className="mb-2 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-6 text-gray-600">
          The page you're looking for doesn't exist.
        </p>

        <NavigationButtons />
      </div>
    </div>
  );
};

export default NotFoundPage;

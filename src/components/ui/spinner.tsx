import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex items-center justify-center">
        <Loader2 className="size-10 animate-spin" />
      </div>
    </div>
  );
};

const InlineSpinner = () => {
  return <Loader2 className="size-6 animate-spin" />;
};

export { Spinner, InlineSpinner };

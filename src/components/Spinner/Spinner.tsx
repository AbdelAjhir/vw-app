import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="size-10 animate-spin" />
    </div>
  );
};

export default Spinner;

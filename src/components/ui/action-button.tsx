import { type ReactNode } from "react";

interface ActionButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "view" | "edit" | "delete";
  className?: string;
}

export const ActionButton = ({
  children,
  onClick,
  variant = "view",
  className = "",
}: ActionButtonProps) => {
  const baseClasses =
    "mr-2 rounded px-2 py-1 text-white transition-colors cursor-pointer flex items-center";

  const variantClasses = {
    view: "bg-green-500 hover:bg-green-600",
    edit: "bg-blue-500 hover:bg-blue-600",
    delete: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

import { toast } from "react-toastify";

// Helper function to format date as DD/MM/YYYY
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Toast message helpers
export const showSuccessToast = (action: string, movieTitle: string) => {
  toast.success(`"${movieTitle}" has been successfully ${action}!`);
};

export const showErrorToast = (action: string) => {
  toast.error(`Failed to ${action} movie. Please try again.`);
};

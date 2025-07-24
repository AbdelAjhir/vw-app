import { ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Reusable sortable header component
export const SortableHeader = ({
  column,
  children,
}: {
  column: any;
  children: React.ReactNode;
}) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {children}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

// Reusable cell components
export const DateCell = ({ value }: { value: string }) => (
  <div>{new Date(value).toLocaleDateString()}</div>
);

export const RatingCell = ({ value }: { value: number }) => (
  <div className="flex items-center gap-2">
    <span className="font-medium">{value.toFixed(1)}</span>
    <Badge variant="secondary">⭐</Badge>
  </div>
);

export const LanguageCell = ({ value }: { value: string }) => (
  <Badge variant="outline">{value.toUpperCase()}</Badge>
);

export const TypeCell = ({ value }: { value: boolean }) => (
  <Badge variant={value ? "destructive" : "default"}>
    {value ? "Adult" : "Family"}
  </Badge>
);

import { memo } from "react";

import { ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Reusable sortable header component
export const SortableHeader = memo(
  ({ column, children }: { column: any; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
);

// Reusable cell components
export const DateCell = memo(({ value }: { value: string }) => (
  <div>{value}</div>
));

export const RatingCell = memo(({ value }: { value: number }) => (
  <div className="flex items-center gap-2">
    <Badge variant="secondary">⭐</Badge>
    <span className="font-medium">{value.toFixed(1)}</span>
  </div>
));

export const LanguageCell = memo(({ value }: { value: string }) => (
  <Badge variant="outline">{value.toUpperCase()}</Badge>
));

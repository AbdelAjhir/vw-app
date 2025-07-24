import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Movie } from "@/types/movie";

import {
  SortableHeader,
  DateCell,
  RatingCell,
  LanguageCell,
  TypeCell,
} from "./MovieTableComponents";

interface ColumnsProps {
  onEdit: (_movie: Movie) => void;
  onDelete: (_movieId: number) => void;
}

export const createColumns = ({
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<Movie>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableHeader column={column}>Title</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "release_date",
    header: ({ column }) => (
      <SortableHeader column={column}>Release Date</SortableHeader>
    ),
    cell: ({ row }) => <DateCell value={row.getValue("release_date")} />,
  },
  {
    accessorKey: "vote_average",
    header: ({ column }) => (
      <SortableHeader column={column}>Rating</SortableHeader>
    ),
    cell: ({ row }) => (
      <RatingCell value={parseFloat(row.getValue("vote_average"))} />
    ),
  },
  {
    accessorKey: "popularity",
    header: ({ column }) => (
      <SortableHeader column={column}>Popularity</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {parseFloat(row.getValue("popularity")).toFixed(0)}
      </div>
    ),
  },
  {
    accessorKey: "original_language",
    header: "Language",
    cell: ({ row }) => (
      <LanguageCell value={row.getValue("original_language")} />
    ),
  },
  {
    accessorKey: "adult",
    header: "Type",
    cell: ({ row }) => <TypeCell value={row.getValue("adult")} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const movie = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => window.open(`/movie/${movie.id}`, "_blank")}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(movie)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Movie
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(movie.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Movie
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

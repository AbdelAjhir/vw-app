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
import { formatDate } from "@/helpers";
import type { Movie } from "@/types/movie";

import {
  SortableHeader,
  DateCell,
  RatingCell,
  LanguageCell,
} from "./MovieTableComponents";

interface ColumnsProps {
  onEdit: (_movie: Movie) => void;
  onDelete: (_movieId: number) => void;
  onView: (_movieId: number) => void;
}

export const createColumns = ({
  onEdit,
  onDelete,
  onView,
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
    cell: ({ row }) => (
      <DateCell value={formatDate(row.getValue("release_date"))} />
    ),
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
        {Math.floor(parseFloat(row.getValue("popularity")))}
      </div>
    ),
  },
  {
    accessorKey: "original_language",
    header: ({ column }) => (
      <SortableHeader column={column}>Language</SortableHeader>
    ),
    cell: ({ row }) => (
      <LanguageCell value={row.getValue("original_language")} />
    ),
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
              className="cursor-pointer"
              onClick={() => onView(movie.id)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onEdit(movie)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Movie
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-600 hover:text-red-500 dark:text-red-600 dark:hover:text-red-500"
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

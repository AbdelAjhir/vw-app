import { useState, useEffect } from "react";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MovieTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (_page: number) => void;
  onPageSizeChange: (_pageSize: number) => void;
  searchQuery: string;
  onSearchChange: (_query: string) => void;
  sortField: string;
  sortOrder: "asc" | "desc";
  onSortChange: (_field: string, _order: "asc" | "desc") => void;
  isLoading?: boolean;
}

export const MovieTable = <TData, TValue>({
  columns,
  data,
  currentPage,
  totalPages,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  searchQuery,
  onSearchChange,
  sortField,
  sortOrder,
  onSortChange,
  isLoading = false,
}: MovieTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    if (sortField) {
      setSorting([{ id: sortField, desc: sortOrder === "desc" }]);
    } else {
      setSorting([]);
    }
  }, [sortField, sortOrder]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    state: { sorting },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);

      if (newSorting.length > 0) {
        const { id, desc } = newSorting[0];
        onSortChange(id, desc ? "desc" : "asc");
      } else {
        onSortChange("", "asc");
      }
    },
  });

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell className="h-24 text-center" colSpan={columns.length}>
            <div className="flex items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></div>
              <span className="ml-2">Loading...</span>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell className="h-24 text-center" colSpan={columns.length}>
            No results found.
          </TableCell>
        </TableRow>
      );
    }

    return table.getRowModel().rows.map((row) => (
      <TableRow data-state={row.getIsSelected() && "selected"} key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <SearchBar
        placeholder="Search movies..."
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      {/* Table */}
      <div className="rounded-md border">
        <div className="overflow-auto">
          <Table className="min-w-[800px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>{renderTableContent()}</TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalCount > 0 && (
        <div className="flex justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="text-muted-foreground text-sm">
              Page {currentPage} of {totalPages} ({data.length} of {totalCount}{" "}
              results)
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Show:</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => onPageSizeChange(Number(value))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[10, 25, 50, 100].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-muted-foreground text-sm">per page</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
            <span className="text-muted-foreground text-sm">
              {totalCount === 1 ? "1 movie" : `${totalCount} movies`}
            </span>
            <div className="flex items-center gap-2">
              <Button
                disabled={currentPage <= 1}
                size="sm"
                variant="outline"
                onClick={() => onPageChange(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <Button
                disabled={currentPage >= totalPages}
                size="sm"
                variant="outline"
                onClick={() => onPageChange(currentPage + 1)}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

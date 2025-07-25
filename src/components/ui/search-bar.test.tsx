import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { SearchBar } from "./search-bar";

describe("SearchBar", () => {
  it("should render with placeholder", () => {
    const mockOnChange = vi.fn();
    render(
      <SearchBar
        placeholder="Search movies..."
        searchQuery=""
        onSearchChange={mockOnChange}
      />
    );

    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
  });

  it("should call onSearchChange when user types", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();

    render(
      <SearchBar
        placeholder="Search movies..."
        searchQuery=""
        onSearchChange={mockOnChange}
      />
    );

    const input = screen.getByPlaceholderText("Search movies...");
    await user.type(input, "test");

    expect(mockOnChange).toHaveBeenCalledTimes(4);
    expect(mockOnChange).toHaveBeenCalledWith("t");
    expect(mockOnChange).toHaveBeenCalledWith("e");
    expect(mockOnChange).toHaveBeenCalledWith("s");
    expect(mockOnChange).toHaveBeenCalledWith("t");
  });

  it("should show clear button when search has value", () => {
    const mockOnChange = vi.fn();
    render(
      <SearchBar
        placeholder="Search movies..."
        searchQuery="test"
        onSearchChange={mockOnChange}
      />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should clear search when clear button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();

    render(
      <SearchBar
        placeholder="Search movies..."
        searchQuery="test"
        onSearchChange={mockOnChange}
      />
    );

    const clearButton = screen.getByRole("button");
    await user.click(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith("");
  });
});

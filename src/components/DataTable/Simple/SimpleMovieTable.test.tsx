import { BrowserRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { mockMovies } from "@/test/mocks";

import SimpleMovieTable from "./SimpleMovieTable";

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("SimpleMovieTable", () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render movies in default order", () => {
    renderWithRouter(
      <SimpleMovieTable
        movies={mockMovies}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const movieTitles = screen.getAllByText(/Ballerina|Lilo & Stitch|Superman/);
    expect(movieTitles[0]).toHaveTextContent("Ballerina");
    expect(movieTitles[1]).toHaveTextContent("Lilo & Stitch");
    expect(movieTitles[2]).toHaveTextContent("Superman");
  });

  it("should sort by title ascending when clicking title header", async () => {
    const user = userEvent.setup();

    renderWithRouter(
      <SimpleMovieTable
        movies={mockMovies}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const titleHeader = screen.getByText("Title");
    await user.click(titleHeader);

    const movieTitles = screen.getAllByText(/Ballerina|Lilo & Stitch|Superman/);
    expect(movieTitles[0]).toHaveTextContent("Ballerina");
    expect(movieTitles[1]).toHaveTextContent("Lilo & Stitch");
    expect(movieTitles[2]).toHaveTextContent("Superman");
  });

  it("should sort by title descending when clicking title header twice", async () => {
    const user = userEvent.setup();

    renderWithRouter(
      <SimpleMovieTable
        movies={mockMovies}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const titleHeader = screen.getByText("Title");
    await user.click(titleHeader);
    await user.click(titleHeader);

    const movieTitles = screen.getAllByText(/Ballerina|Lilo & Stitch|Superman/);
    expect(movieTitles[0]).toHaveTextContent("Superman");
    expect(movieTitles[1]).toHaveTextContent("Lilo & Stitch");
    expect(movieTitles[2]).toHaveTextContent("Ballerina");
  });
});

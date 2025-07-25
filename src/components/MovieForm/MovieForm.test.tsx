import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import MovieForm from "./MovieForm";

describe("MovieForm", () => {
  const mockOnSubmit = vi.fn();
  const mockOnOpenChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render form fields", () => {
    render(
      <MovieForm
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByPlaceholderText("Movie title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Movie overview")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("0.0")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("100")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("en")).toBeInTheDocument();
  });

  it("should show validation errors for empty required fields", async () => {
    const user = userEvent.setup();

    render(
      <MovieForm
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByRole("button", { name: /add movie/i });
    await user.click(submitButton);

    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Overview is required")).toBeInTheDocument();
    expect(screen.getByText("Release date is required")).toBeInTheDocument();
    expect(
      screen.getByText("Rating must be between 0 and 10")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Popularity must be a positive number")
    ).toBeInTheDocument();
    expect(screen.getByText("Language is required")).toBeInTheDocument();
  });

  it("should validate rating range", async () => {
    const user = userEvent.setup();

    render(
      <MovieForm
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
      />
    );

    const ratingInput = screen.getByPlaceholderText("0.0");
    await user.type(ratingInput, "11");

    const submitButton = screen.getByRole("button", { name: /add movie/i });
    await user.click(submitButton);

    expect(
      screen.getByText("Rating must be between 0 and 10")
    ).toBeInTheDocument();
  });

  it("should validate language format", async () => {
    const user = userEvent.setup();

    render(
      <MovieForm
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
      />
    );

    const languageInput = screen.getByPlaceholderText("en");
    await user.clear(languageInput);
    await user.type(languageInput, "e");

    const submitButton = screen.getByRole("button", { name: /add movie/i });
    await user.click(submitButton);

    expect(
      screen.getByText("Language must be 2 characters (e.g., en, es, fr)")
    ).toBeInTheDocument();
  });
});

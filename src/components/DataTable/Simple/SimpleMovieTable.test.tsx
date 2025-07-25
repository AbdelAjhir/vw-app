import { BrowserRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import SimpleMovieTable from "./SimpleMovieTable";

const mockMovies = [
  {
    id: 541671,
    title: "Ballerina",
    original_title: "Ballerina",
    overview:
      "Taking place during the events of John Wick: Chapter 3 – Parabellum, Eve Macarro begins her training in the assassin traditions of the Ruska Roma.",
    release_date: "2025-06-04",
    vote_average: 7.484,
    popularity: 312.2247,
    original_language: "en",
    adult: false,
    video: false,
    backdrop_path: "/oPgXVSdGR9dGwbmvIToOCMmsdc2.jpg",
    poster_path: "/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg",
    genre_ids: [28, 53, 80],
    vote_count: 1101,
  },
  {
    id: 552524,
    title: "Lilo & Stitch",
    original_title: "Lilo & Stitch",
    overview:
      "The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.",
    release_date: "2025-05-17",
    vote_average: 7.2,
    popularity: 291.1984,
    original_language: "en",
    adult: false,
    video: false,
    backdrop_path: "/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
    poster_path: "/c32TsWLES7kL1uy6fF03V67AIYX.jpg",
    genre_ids: [10751, 878, 35, 12],
    vote_count: 900,
  },
  {
    id: 1061474,
    title: "Superman",
    original_title: "Superman",
    overview:
      "Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent.",
    release_date: "2025-07-09",
    vote_average: 7.5,
    popularity: 399.7971,
    original_language: "en",
    adult: false,
    video: false,
    backdrop_path: "/ApRxyHFuvv5yghedxXPJSm9FEDe.jpg",
    poster_path: "/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg",
    genre_ids: [878, 12, 28],
    vote_count: 1023,
  },
];

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

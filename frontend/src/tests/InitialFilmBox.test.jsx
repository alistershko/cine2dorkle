import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import InitialFilmBox from "../components/InitialFilmBox";
import { getCastFromMovieId } from "../services/movies";

// Mock the `getCastFromMovieId` function
vi.mock("../services/movies", () => ({
  getCastFromMovieId: vi.fn(),
}));

describe("InitialFilmBox", () => {
  // Test when movie is null
  it("displays 'No movie data available' when no movie prop is provided", () => {
    render(<InitialFilmBox movie={null} />);
    expect(screen.getByText(/no movie data available/i)).toBeInTheDocument();
  });

  // Test with a valid movie prop
  it("renders movie details when movie prop is provided", async () => {
    const movie = {
      id: 1,
      title: "Test Movie",
      poster_path: "/test-poster.jpg",
      release_date: "2025-05-01",
    };

    // Mock the cast fetching
    getCastFromMovieId.mockResolvedValue([
      { name: "Actor 1" },
      { name: "Actor 2" },
      // ...mock 12 actors here
    ]);

    render(<InitialFilmBox movie={movie} />);

    await waitFor(() => {
      expect(screen.getByText(/test movie/i)).toBeInTheDocument();
      expect(screen.getByText(/2025/i)).toBeInTheDocument();
      expect(screen.getByAltText(/test movie poster/i)).toBeInTheDocument();
      expect(screen.getByText(/actor 1/i)).toBeInTheDocument();
    });
  });

  // Test cast is limited to 12 actors
  it("limits the cast to 12 actors", async () => {
    const movie = {
      id: 1,
      title: "Test Movie",
      poster_path: "/test-poster.jpg",
      release_date: "2025-05-01",
    };

    getCastFromMovieId.mockResolvedValue(
      Array.from({ length: 20 }, (_, index) => ({ name: `Actor ${index + 1}` }))
    );

    render(<InitialFilmBox movie={movie} />);

    await waitFor(() => {
      const actors = screen.getAllByText(/actor/i);
      expect(actors).toHaveLength(12); // Make sure only 12 actors are rendered
    });
  });

  // Test poster URL generation
  it("generates the correct poster URL", async () => {
    const movie = {
      id: 1,
      title: "Test Movie",
      poster_path: "/test-poster.jpg",
      release_date: "2025-05-01",
    };

    getCastFromMovieId.mockResolvedValue([
      { name: "Actor 1" },
      { name: "Actor 2" },
    ]);

    render(<InitialFilmBox movie={movie} />);

    await waitFor(() => {
      const poster = screen.getByAltText(/test movie poster/i);
      expect(poster.src).toBe("https://image.tmdb.org/t/p/w500/test-poster.jpg");
    });
  });

  // Test release year display
  it("displays 'Unknown' if no release date is provided", async () => {
    const movie = {
      id: 1,
      title: "Test Movie",
      poster_path: "/test-poster.jpg",
      release_date: null, // No release date
    };

    getCastFromMovieId.mockResolvedValue([
      { name: "Actor 1" },
      { name: "Actor 2" },
    ]);

    render(<InitialFilmBox movie={movie} />);

    await waitFor(() => {
      expect(screen.getByText(/unknown/i)).toBeInTheDocument();
    });
  });
});

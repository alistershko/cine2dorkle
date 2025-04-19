import React from "react";
import { render, screen } from "@testing-library/react";
import GuessMovieBox from "../components/GuessMovieBox"; 

describe("GuessMovieBox Component", () => {
  const mockMovie = {
    title: "Inception",
    release_date: "2010-07-16",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  };

  // Shows 'no movie' if no movie provided
  it("renders 'no movie' message if no movie prop is provided", () => {
    render(<GuessMovieBox />);
    expect(screen.getByText(/no movie data available/i)).toBeInTheDocument();
  });

  // Shows correct poster, title and release year
  it("renders movie poster, title, and release year correctly", () => {
    render(<GuessMovieBox movie={mockMovie} />);
    
    const img = screen.getByAltText(/inception poster/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("Released: 2010")).toBeInTheDocument();
  });

  // Shows 'unknown' if release dates missing
  it("renders 'Unknown' if release date is missing", () => {
    const movieWithoutDate = {
      ...mockMovie,
      release_date: null,
    };
    render(<GuessMovieBox movie={movieWithoutDate} />);
    expect(screen.getByText("Released: Unknown")).toBeInTheDocument();
  });
});

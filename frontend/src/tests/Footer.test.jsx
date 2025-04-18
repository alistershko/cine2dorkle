import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../components/Footer";

// Footer renders
describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    const footerElement = screen.getByText(/this product uses the tmdb api/i);
    expect(footerElement).toBeInTheDocument();
  });
});

  // TMDB logo appears with correct alt text
  it("displays the TMDB logo with alt text", () => {
    render(<Footer />);
    const logo = screen.getByAltText(/TMDB logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src");
  });

  // Footer has correct styling
  it("has the footer class for styling", () => {
    render(<Footer />);
    const footer = screen.getByText(/this product uses the tmdb api/i).closest("div");
    expect(footer).toHaveClass("footer");
  });


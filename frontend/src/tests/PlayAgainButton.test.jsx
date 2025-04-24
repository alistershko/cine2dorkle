import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PlayAgainButton from "../components/PlayAgainButton";

describe("PlayAgainButton", () => {
  it("renders the button with text 'Play Again'", () => {
    render(<PlayAgainButton onClick={() => {}} />);
    const button = screen.getByRole("button", { name: /play again/i });
    expect(button).toBeInTheDocument();
  });

  it("has the correct CSS class", () => {
    render(<PlayAgainButton onClick={() => {}} />);
    const button = screen.getByRole("button", { name: /play again/i });
    expect(button).toHaveClass("playagain-btn");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<PlayAgainButton onClick={handleClick} />);
    const button = screen.getByRole("button", { name: /play again/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

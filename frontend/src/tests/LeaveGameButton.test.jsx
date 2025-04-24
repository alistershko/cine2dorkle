import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LeaveGameButton from "../components/LeaveGameButton";

describe("LeaveGameButton", () => {
  it("renders the button with text 'Home'", () => {
    render(<LeaveGameButton onClick={() => {}} />);
    const button = screen.getByRole("button", { name: /home/i });
    expect(button).toBeInTheDocument();
  });

  it("has the correct CSS class", () => {
    render(<LeaveGameButton onClick={() => {}} />);
    const button = screen.getByRole("button", { name: /home/i });
    expect(button).toHaveClass("leave-btn");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<LeaveGameButton onClick={handleClick} />);
    const button = screen.getByRole("button", { name: /home/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

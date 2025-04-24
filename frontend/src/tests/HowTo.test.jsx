import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HowTo from "../components/HowTo";

// Component renders the 'how to play' button
describe("HowTo Component", () => {
  it("renders 'How to play' button", () => {
    render(<HowTo />);
    const button = screen.getByText(/how to play/i);
    expect(button).toBeInTheDocument();
  });

  // How to play button opens modal
  it("opens modal on button click", () => {
    render(<HowTo />);
    const button = screen.getByRole("button", { name: /how to play/i });
    fireEvent.click(button);

    // Check that the modal content has been rendered
    expect(screen.getByText(/how to play double feature/i)).toBeInTheDocument();
    expect(screen.getByText(/how well do you know your films\?/i)).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  // Close button exits modal
  it("closes modal on close button click", () => {
    render(<HowTo />);
    const button = screen.getByRole("button", { name: /how to play/i });
    fireEvent.click(button);

    const closeBtn = screen.getByText("X");
    fireEvent.click(closeBtn);

    // Check that modal content is no longer visible
    expect(screen.queryByText(/how to play double feature/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/how well do you know your films\?/i)).not.toBeInTheDocument();
  });
});
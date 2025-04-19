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

    expect(screen.getByText(/this is how to play/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /×/ })).toBeInTheDocument();
  });

  // Close button exits modal
  it("closes modal on close button click", () => {
    render(<HowTo />);
    const button = screen.getByRole("button", { name: /how to play/i });
    fireEvent.click(button);

    const closeBtn = screen.getByRole("button", { name: /×/ });
    fireEvent.click(closeBtn);

    expect(screen.queryByText(/this is how to play/i)).not.toBeInTheDocument();
  });
});

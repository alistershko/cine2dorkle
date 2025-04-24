import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ControlsHeader from "../components/ControlsHeader";
import '@testing-library/jest-dom';

describe('ControlsHeader', () => {
  it("renders ThemeToggle and SoundToggle", () => {
    render(<ControlsHeader />);
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument(); // Make sure data-testid is set correctly
    expect(screen.getByTestId("sound-toggle")).toBeInTheDocument();
  });
  
  it("displays 'Easy Mode' when gameMode is 'easy'", () => {
    render(<ControlsHeader gameMode="easy" />);
    expect(screen.getByText("Easy Mode")).toBeInTheDocument();
  });
  
  it("displays 'Hard Mode' when gameMode is 'hard'", () => {
    render(<ControlsHeader gameMode="hard" />);
    expect(screen.getByText("Hard Mode")).toBeInTheDocument();
  });
  
  it("does not render game mode indicator when gameMode is not provided", () => {
    render(<ControlsHeader />);
    expect(screen.queryByText(/Mode/)).not.toBeInTheDocument();
  });
});
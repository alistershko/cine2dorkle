import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ModeToggle from "../components/ModeToggle";
import React from "react";
import "@testing-library/jest-dom";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// Replace the global localStorage with our mock
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("ModeToggle", () => {
  // Create mock for the onModeChange callback
  const mockOnModeChange = vi.fn();

  beforeEach(() => {
    // Clear mocks and localStorage
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it("renders in easy mode by default", () => {
    render(<ModeToggle onModeChange={mockOnModeChange} />);

    // Check that the toggle container is rendered
    const container = screen.getByTestId("mode-toggle-container");
    expect(container).toBeInTheDocument();

    // Check that it shows easy mode initially (active label)
    const easyLabel = screen.getByText("Easy Mode");
    expect(easyLabel).toHaveClass("active");
  });

  it("toggles to hard mode when clicked", () => {
    render(<ModeToggle onModeChange={mockOnModeChange} />);

    // Get the checkbox input
    const checkbox = screen.getByRole("checkbox");

    // Click to toggle to hard mode
    fireEvent.click(checkbox);

    // Check hard mode label is active
    const hardLabel = screen.getByText("Hard Mode");
    expect(hardLabel).toHaveClass("active");
  });

  it("calls onModeChange callback with the new mode", () => {
    render(<ModeToggle onModeChange={mockOnModeChange} />);

    // Initially no calls
    expect(mockOnModeChange).not.toHaveBeenCalled();

    // Get the checkbox input
    const checkbox = screen.getByRole("checkbox");

    // Click to toggle to hard mode
    fireEvent.click(checkbox);

    // Should call onModeChange with "hard"
    expect(mockOnModeChange).toHaveBeenCalledWith("hard");

    // Click again to toggle back to easy mode
    fireEvent.click(checkbox);

    // Should call onModeChange with "easy"
    expect(mockOnModeChange).toHaveBeenCalledWith("easy");
  });

  it("accepts an initialMode prop", () => {
    // Add data to localStorage to simulate hard mode
    localStorageMock.getItem.mockReturnValueOnce("hard");

    // Render with hard mode in localStorage
    render(<ModeToggle onModeChange={mockOnModeChange} />);

    // Should start in hard mode (checkbox checked)
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();

    // Hard mode label should be active
    const hardLabel = screen.getByText("Hard Mode");
    expect(hardLabel).toHaveClass("active");
  });

  it("updates localStorage when mode changes", () => {
    render(<ModeToggle onModeChange={mockOnModeChange} />);

    // Get the checkbox
    const checkbox = screen.getByRole("checkbox");

    // Click to toggle to hard mode
    fireEvent.click(checkbox);

    // Should save to localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith("gameMode", "hard");

    // Click to toggle back to easy mode
    fireEvent.click(checkbox);

    // Should save to localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith("gameMode", "easy");
  });

  it("handles multiple clicks correctly", () => {
    render(<ModeToggle onModeChange={mockOnModeChange} />);

    const checkbox = screen.getByRole("checkbox");

    // Click several times
    fireEvent.click(checkbox); // to hard
    fireEvent.click(checkbox); // to easy
    fireEvent.click(checkbox); // to hard

    // Should end up in hard mode
    expect(checkbox).toBeChecked();

    // onModeChange should have been called 3 times
    expect(mockOnModeChange).toHaveBeenCalledTimes(3);

    // Last call should be with "hard"
    expect(mockOnModeChange).toHaveBeenLastCalledWith("hard");
  });
});

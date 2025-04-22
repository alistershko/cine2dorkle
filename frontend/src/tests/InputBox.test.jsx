import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InputBox from "../components/InputBox";
import { getSearchResults } from "../services/movies";

// Tests will need to be updated when inputbox placeholder changes

// Mock the search function
vi.mock("../services/movies", () => ({
  getSearchResults: vi.fn(),
}));

describe("InputBox", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Checks there's an input field
  it("renders input field", () => {
    render(<InputBox />);
    const input = screen.getByPlaceholderText(/search for a movie.../i);
    expect(input).toBeInTheDocument();
  });

  // Checks input is updated when user types
  it("updates input value when typed", () => {
    render(<InputBox />);
    const input = screen.getByPlaceholderText(/search for a movie.../i); // Need to update with placeholder
    fireEvent.change(input, { target: { value: "apple" } });
    expect(input.value).toBe("apple");
  });
  
  // Check dropdown menu appears 300ms after user types
  it("calls getSearchResults after debounce", async () => {
    getSearchResults.mockResolvedValue([{ title: "Apple" }, { title: "Banana" }]);

    render(<InputBox />);
    const input = screen.getByPlaceholderText(/search for a movie.../i);
    fireEvent.change(input, { target: { value: "app" } });

    await waitFor(() => {
      expect(getSearchResults).toHaveBeenCalledWith("app");
    });
  });

  // Checks dropdown displays
  it("displays dropdown suggestions", async () => {
    getSearchResults.mockResolvedValue([{ title: "Apple" }, { title: "Apricot" }]);

    render(<InputBox />);
    const input = screen.getByPlaceholderText(/search for a movie.../i);
    fireEvent.change(input, { target: { value: "ap" } });

    await screen.findByText("Apple"); // Waits for the dropdown
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Apricot")).toBeInTheDocument();
  });

  // Checks dropdown hides when suggestion clicked
  it("updates input and hides dropdown when a suggestion is clicked", async () => {
    getSearchResults.mockResolvedValue([{ title: "Apple" }]);

    render(<InputBox />);
    const input = screen.getByPlaceholderText(/search for a movie.../i);
    fireEvent.change(input, { target: { value: "app" } });

    const item = await screen.findByText("Apple");
    fireEvent.click(item);

    expect(input.value).toBe("Apple");
    expect(screen.queryByText("Apple")).not.toBeInTheDocument(); // dropdown hidden
  });
});

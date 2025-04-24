import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../components/ThemeToggle";
import React from "react";

describe("ThemeToggle", () => {
  let localStorageMock = {};

  beforeEach(() => {
    // Setup localStorage mock
    localStorageMock = {};

    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn((key) => localStorageMock[key] || null),
        setItem: vi.fn((key, value) => {
          localStorageMock[key] = value;
        }),
        removeItem: vi.fn((key) => {
          delete localStorageMock[key];
        }),
      },
      writable: true,
    });

    // Mock document methods
    vi.spyOn(document.documentElement, "setAttribute");
    vi.spyOn(document.documentElement.classList, "add");
    vi.spyOn(document.documentElement.classList, "remove");

    // Clear mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders with dark theme by default", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Toggle Theme");

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("moon"));
  });

  it("renders with light theme when localStorage has light theme", () => {
    localStorageMock["theme"] = "light";

    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("sun"));
  });

  it("toggles theme when clicked", () => {
    render(<ThemeToggle />);

    // Initial state: dark theme
    let button = screen.getByRole("button");
    let img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("moon"));

    // Click to toggle to light theme
    fireEvent.click(button);

    img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("sun"));

    // Click to toggle back to dark theme
    fireEvent.click(button);

    img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("moon"));
  });

  it("updates localStorage when theme changes", () => {
    render(<ThemeToggle />);

    // Initial render should set theme to dark in localStorage
    expect(window.localStorage.setItem).toHaveBeenCalledWith("theme", "dark");

    // Click to toggle to light theme
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Should update localStorage to light
    expect(window.localStorage.setItem).toHaveBeenCalledWith("theme", "light");
  });

  it("updates document attributes and classes when theme changes", () => {
    render(<ThemeToggle />);

    // Initial render should set data-theme attribute to dark
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
      "data-theme",
      "dark"
    );
    expect(document.documentElement.classList.add).toHaveBeenCalledWith("dark");
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith(
      "light"
    );

    // Reset mocks to clearly see the next calls
    vi.clearAllMocks();

    // Click to toggle to light theme
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Should update document to light theme
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
      "data-theme",
      "light"
    );
    expect(document.documentElement.classList.add).toHaveBeenCalledWith(
      "light"
    );
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith(
      "dark"
    );
  });

  it("applies correct CSS class to button", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("toggle-btn");
  });
});

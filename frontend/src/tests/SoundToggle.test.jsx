import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SoundToggle from "../components/SoundToggle";
import React from "react";

describe("SoundToggle", () => {
  let localStorageMock = {};

  const dispatchEventSpy = vi.spyOn(document, "dispatchEvent");

  beforeEach(() => {
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

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders with sound enabled by default", () => {
    render(<SoundToggle />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Mute Sound");
    expect(button).toHaveAttribute("title", "Sound On");

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("on-red-gold"));
  });

  it('renders with sound disabled when localStorage has "false"', () => {
    localStorageMock["soundEnabled"] = "false";

    render(<SoundToggle />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Enable Sound");
    expect(button).toHaveAttribute("title", "Sound Off");

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("muted-red-gold")
    );
  });

  it("toggles sound state when clicked", () => {
    render(<SoundToggle />);

    let button = screen.getByRole("button");
    let img = screen.getByRole("img");
    expect(button).toHaveAttribute("aria-label", "Mute Sound");
    expect(img).toHaveAttribute("src", expect.stringContaining("on-red-gold"));

    fireEvent.click(button);

    button = screen.getByRole("button");
    img = screen.getByRole("img");
    expect(button).toHaveAttribute("aria-label", "Enable Sound");
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("muted-red-gold")
    );

    fireEvent.click(button);

    button = screen.getByRole("button");
    img = screen.getByRole("img");
    expect(button).toHaveAttribute("aria-label", "Mute Sound");
    expect(img).toHaveAttribute("src", expect.stringContaining("on-red-gold"));
  });

  it("updates localStorage when state changes", () => {
    render(<SoundToggle />);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "soundEnabled",
      true
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "soundEnabled",
      false
    );
  });

  it("dispatches a custom event when toggled", () => {
    const originalDispatchEvent = document.dispatchEvent;
    const mockDispatchEvent = vi.fn();
    document.dispatchEvent = mockDispatchEvent;

    try {
      render(<SoundToggle />);

      mockDispatchEvent.mockReset();

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(mockDispatchEvent).toHaveBeenCalled();

      const event = mockDispatchEvent.mock.calls[0][0];
      expect(event.type).toBe("soundSettingChanged");
      expect(event.detail).toEqual({ soundEnabled: false });
    } finally {
      document.dispatchEvent = originalDispatchEvent;
    }
  });

  it("sets data-attribute on document element", () => {
    const setAttributeSpy = vi.spyOn(document.documentElement, "setAttribute");

    render(<SoundToggle />);

    expect(setAttributeSpy).toHaveBeenCalledWith("data-sound-enabled", true);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(setAttributeSpy).toHaveBeenCalledWith("data-sound-enabled", false);
  });

  it("applies correct CSS class to button", () => {
    render(<SoundToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("toggle-btn");
  });
});

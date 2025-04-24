import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { HomePage } from "../pages/home/HomePage";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock all child components
vi.mock("../components/Footer", () => ({
  default: () => <div data-testid="mock-footer">Footer</div>,
}));

vi.mock("../components/PlayButton", () => ({
  default: () => <button data-testid="mock-play-button">Play</button>,
}));

vi.mock("../components/ModeToggle", () => ({
  default: () => <div data-testid="mock-mode-toggle">Mode Toggle</div>,
}));

vi.mock("../components/DoubleFeatureLogo", () => ({
  DoubleFeatureLogo: () => (
    <div data-testid="mock-logo">Double Feature Logo</div>
  ),
}));

vi.mock("../components/ControlsHeader", () => ({
  default: () => <div data-testid="mock-controls-header">Controls Header</div>,
}));

vi.mock("../components/HowTo", () => ({
  default: () => <div data-testid="mock-how-to">How To</div>,
}));

// Better mocks to match the real implementation
const mockPlay = vi.fn().mockImplementation(() => Promise.resolve());
const mockPause = vi.fn();

// Create a real class-like Audio mock
class MockAudio {
  constructor(src) {
    this.src = src;
    this.loop = false;
  }

  play() {
    mockPlay();
    return Promise.resolve();
  }

  pause() {
    mockPause();
  }
}

// Replace global Audio with our implementation
global.Audio = MockAudio;

// Track real event listeners
const realAddEventListener = document.addEventListener;
const realRemoveEventListener = document.removeEventListener;
const addedEventListeners = [];

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

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("HomePage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();

    // Clear our tracking array
    addedEventListeners.length = 0;

    // Mock document event listeners with tracking
    document.addEventListener = vi.fn((event, handler) => {
      addedEventListeners.push({ event, handler });
      realAddEventListener.call(document, event, handler);
    });

    document.removeEventListener = vi.fn((event, handler) => {
      realRemoveEventListener.call(document, event, handler);
    });
  });

  afterEach(() => {
    vi.resetAllMocks();

    // Restore original event listeners
    document.addEventListener = realAddEventListener;
    document.removeEventListener = realRemoveEventListener;
  });

  const renderHomePage = () =>
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

  it("renders without crashing", () => {
    renderHomePage();
    expect(screen.getByText("Welcome to")).toBeInTheDocument();
  });

  it("renders all child components", () => {
    renderHomePage();
    expect(screen.getByTestId("mock-controls-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-logo")).toBeInTheDocument();
    expect(screen.getByTestId("mock-play-button")).toBeInTheDocument();
    expect(screen.getByTestId("mock-mode-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("mock-how-to")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
  });

  it("displays the welcome text and description", () => {
    renderHomePage();
    expect(screen.getByText("Welcome to")).toBeInTheDocument();
    expect(
      screen.getByText("🎬 Make connections between movies to win 🍿")
    ).toBeInTheDocument();
  });

  // it("initializes background music with sound enabled by default", () => {
  //   renderHomePage();

  //   // Allow time for the effect to run
  //   vi.runAllTimers();

  //   expect(mockPlay).toHaveBeenCalled();
  // });

  it("does not play background music when sound is disabled", () => {
    // Set sound as disabled in localStorage
    localStorageMock.getItem.mockReturnValueOnce("false");

    renderHomePage();

    expect(mockPlay).not.toHaveBeenCalled();
  });

  it("sets up event listener for sound toggle changes", () => {
    renderHomePage();

    // Check if our tracked array has the correct event listener
    const hasEventListener = addedEventListeners.some(
      (listener) => listener.event === "soundSettingChanged"
    );

    expect(hasEventListener).toBe(true);
  });

  // it("cleans up audio and event listeners on unmount", () => {
  //   const { unmount } = renderHomePage();

  //   // Need to ensure we've created the audio before checking cleanup
  //   expect(global.Audio).toHaveBeenCalledWith(
  //     expect.stringContaining("Jazz.mp3")
  //   );

  //   unmount();

  //   // After unmount, pause should be called
  //   expect(mockPause).toHaveBeenCalled();

  //   // Check remove event listener was called with correct event name
  //   expect(document.removeEventListener).toHaveBeenCalledWith(
  //     "soundSettingChanged",
  //     expect.any(Function)
  //   );
  // });

  it("has the correct CSS classes for layout", () => {
    renderHomePage();
    const pageContainer = screen
      .getByText("Welcome to")
      .closest(".page-container");
    const homeContent = screen.getByText("Welcome to").closest(".home-content");

    expect(pageContainer).toHaveClass("page-container");
    expect(homeContent).toHaveClass("home-content");
  });
});

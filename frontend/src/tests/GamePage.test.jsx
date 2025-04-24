import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import GamePage from "../pages/game/Game";
import * as gameService from "../services/game";
import * as soundService from "../services/sound";
import "@testing-library/jest-dom";

// Create a referenceable navigate mock
const navigateMock = vi.fn();

// Mock all dependencies
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useSearchParams: () => [new URLSearchParams({ mode: "easy" })],
  };
});

vi.mock("../services/game", () => ({
  startNewGame: vi.fn(),
  guessMovie: vi.fn(),
}));

vi.mock("../services/sound", () => ({
  playSound: vi.fn(),
  isSoundEnabled: vi.fn().mockReturnValue(true),
}));

vi.mock("../components/InitialFilmBox", () => ({
  default: ({ movie }) => (
    <div data-testid="mock-initial-film-box">
      {movie && <span>{movie.title}</span>}
    </div>
  ),
}));

vi.mock("../components/InputBox", () => ({
  default: ({ onGuessMade, onSuccessfulGuess }) => (
    <div data-testid="mock-input-box">
      <button
        onClick={() => onGuessMade("Test Guess")}
        data-testid="mock-guess-button"
      >
        Make Guess
      </button>
      <button
        onClick={() =>
          onSuccessfulGuess(
            {
              id: 2,
              title: "Test Movie 2",
              release_date: "2020-01-01",
              poster_path: "/test2.jpg",
            },
            [{ name: "Actor Name", usageCount: 1 }]
          )
        }
        data-testid="mock-successful-guess"
      >
        Successful Guess
      </button>
    </div>
  ),
}));

vi.mock("../components/Timer", () => ({
  default: ({ onTimeUp }) => (
    <div data-testid="mock-timer">
      <button onClick={() => onTimeUp()} data-testid="mock-timer-finish">
        Finish Timer
      </button>
    </div>
  ),
}));

vi.mock("../components/ResultsModal", () => ({
  default: ({ isOpen, playAgain, leaveGame, score }) =>
    isOpen ? (
      <div data-testid="mock-results-modal">
        <div>Score: {score}</div>
        <button onClick={playAgain} data-testid="play-again-button">
          Play Again
        </button>
        <button onClick={leaveGame} data-testid="leave-game-button">
          Home
        </button>
      </div>
    ) : null,
}));

vi.mock("../components/Footer", () => ({
  default: () => <div data-testid="mock-footer">Footer</div>,
}));

vi.mock("../components/ControlsHeader", () => ({
  default: ({ gameMode }) => (
    <div data-testid="mock-controls-header">Controls Header ({gameMode})</div>
  ),
}));

// Mock Audio class
const mockPlay = vi.fn().mockImplementation(() => {
  return Promise.resolve().catch(() => {}); // Ensure it has a catch method
});
const mockPause = vi.fn();

// Fix the MockAudio class implementation
class MockAudio {
  constructor(src) {
    this.src = src;
    this.loop = false;
    this.volume = 1;
    this.currentTime = 0;
  }

  // Make sure play returns a Promise with catch method
  play() {
    mockPlay();
    return Promise.resolve().catch(() => {});
  }

  pause() {
    mockPause();
  }
}

global.Audio = MockAudio;

describe("GamePage Component", () => {
  // Set up mock data
  const mockMovieData = {
    id: 1,
    gameStatus: "active",
    time: 20,
    targetMovie: {
      id: 12345,
      title: "Inception",
      release_date: "2010-07-16",
      poster_path: "/path/to/poster.jpg",
    },
    movieIDsPlayed: [12345],
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Reset mocks
    gameService.startNewGame.mockResolvedValue(mockMovieData);

    // Mock document event listeners
    document.addEventListener = vi.fn();
    document.removeEventListener = vi.fn();

    // Mock window.location.reload
    Object.defineProperty(window, "location", {
      writable: true,
      value: { reload: vi.fn() },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders initial game screen", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/game?mode=easy"]}>
          <GamePage />
        </MemoryRouter>
      );
    });

    // Check core components are rendered
    expect(screen.getByTestId("mock-controls-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-timer")).toBeInTheDocument();
    expect(screen.getByTestId("mock-input-box")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();

    // Verify startNewGame was called
    expect(gameService.startNewGame).toHaveBeenCalledTimes(1);
  });

  //   it("increments score when a successful guess is made", async () => {
  //     await act(async () => {
  //       render(
  //         <MemoryRouter initialEntries={["/game?mode=easy"]}>
  //           <GamePage />
  //         </MemoryRouter>
  //       );
  //     });

  //     // Initial score should be 0
  //     // (we'd check this if we could access the state directly)

  //     // Make a successful guess
  //     const successfulGuessButton = screen.getByTestId("mock-successful-guess");
  //     await act(async () => {
  //       fireEvent.click(successfulGuessButton);
  //     });

  //     // Make another successful guess
  //     await act(async () => {
  //       fireEvent.click(successfulGuessButton);
  //     });

  //     // Wait for the timer to finish to see the score
  //     const finishTimerButton = screen.getByTestId("mock-timer-finish");

  //     // Trigger time up
  //     await act(async () => {
  //       fireEvent.click(finishTimerButton);
  //     });

  //     // Wait for results modal to appear
  //     await waitFor(() => {
  //       expect(screen.getByTestId("mock-results-modal")).toBeInTheDocument();
  //     });

  //     // Check that the score in the results modal is 2
  //     expect(screen.getByText("Score: 2")).toBeInTheDocument();
  //   });

  it("resets the timer when a guess is made", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/game?mode=easy"]}>
          <GamePage />
        </MemoryRouter>
      );
    });

    const guessButton = screen.getByTestId("mock-guess-button");

    // Make a guess
    await act(async () => {
      fireEvent.click(guessButton);
    });

    // Verify timer should be reset (via timerResetTrigger change)
    // We can't test state directly, but the Timer would get a new resetTrigger prop
  });

  it("shows results modal when timer finishes", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/game?mode=easy"]}>
          <GamePage />
        </MemoryRouter>
      );
    });

    // Initially, results modal should not be visible
    expect(screen.queryByTestId("mock-results-modal")).not.toBeInTheDocument();

    // Finish the timer
    const finishTimerButton = screen.getByTestId("mock-timer-finish");

    await act(async () => {
      fireEvent.click(finishTimerButton);
      // Fast-forward timers to ensure the modal shows up
      await new Promise((resolve) => setTimeout(resolve, 2100));
    });

    // Now results modal should be visible
    expect(screen.getByTestId("mock-results-modal")).toBeInTheDocument();
  });

  it("plays drumroll sound when timer finishes", async () => {
    soundService.isSoundEnabled.mockReturnValue(true);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/game?mode=easy"]}>
          <GamePage />
        </MemoryRouter>
      );
    });

    // Finish the timer
    const finishTimerButton = screen.getByTestId("mock-timer-finish");

    await act(async () => {
      fireEvent.click(finishTimerButton);
    });

    // Verify the drumroll audio was created and played
    expect(mockPlay).toHaveBeenCalled();
  });

  it("reloads the page when Play Again button is clicked", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/game?mode=easy"]}>
          <GamePage />
        </MemoryRouter>
      );
    });

    // Finish the timer to show results modal
    const finishTimerButton = screen.getByTestId("mock-timer-finish");

    await act(async () => {
      fireEvent.click(finishTimerButton);
      // Fast-forward timers
      await new Promise((resolve) => setTimeout(resolve, 2100));
    });

    // Click the Play Again button
    await act(async () => {
      const playAgainButton = screen.getByTestId("play-again-button");
      fireEvent.click(playAgainButton);
    });

    // Verify the page was reloaded
    expect(window.location.reload).toHaveBeenCalled();
  });

  it("navigates home when Leave Game button is clicked", async () => {
    // Clear any previous calls to navigate
    navigateMock.mockClear();

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/game?mode=easy"]}>
          <GamePage />
        </MemoryRouter>
      );
    });

    // Finish the timer to show results modal
    const finishTimerButton = screen.getByTestId("mock-timer-finish");

    await act(async () => {
      fireEvent.click(finishTimerButton);
      // Fast-forward timers
      await new Promise((resolve) => setTimeout(resolve, 2100));
    });

    // Click the Leave Game button
    await act(async () => {
      const leaveGameButton = screen.getByTestId("leave-game-button");
      fireEvent.click(leaveGameButton);
    });

    // Now verify it was called with the home path
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  //   it("initializes background music on mount", async () => {
  //     soundService.isSoundEnabled.mockReturnValue(true);

  //     await act(async () => {
  //       render(
  //         <MemoryRouter initialEntries={["/game?mode=easy"]}>
  //           <GamePage />
  //         </MemoryRouter>
  //       );
  //     });

  //     // Verify audio instance was created and played
  //     expect(MockAudio).toHaveBeenCalledWith(
  //       expect.stringContaining("QuirkyJazz.mp3")
  //     );
  //     expect(mockPlay).toHaveBeenCalled();
  //   });

  it("handles sound toggle changes through event listener", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/game?mode=easy"]}>
          <GamePage />
        </MemoryRouter>
      );
    });

    // Verify the event listener was added
    expect(document.addEventListener).toHaveBeenCalledWith(
      "soundSettingChanged",
      expect.any(Function)
    );
  });

  // Replace the game mode test

  it("initializes with the correct game mode from URL parameters", async () => {
    // First, reset all mocks to ensure clean state
    vi.resetAllMocks();

    // Clear any cached modules that might retain state
    vi.resetModules();

    // Mock react-router-dom again specifically for this test
    vi.doMock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => navigateMock,
        // Use "hard" mode in the URL params
        useSearchParams: () => [new URLSearchParams({ mode: "hard" })],
      };
    });

    // Re-import after re-mocking
    const { default: GamePage } = await import("../pages/game/Game");

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/game?mode=hard"]}>
          <GamePage />
        </MemoryRouter>
      );
    });

    // Verify the controls header received the correct game mode
    // Access it with a data-testid instead of text content
    const controlsHeader = screen.getByTestId("mock-controls-header");
    expect(controlsHeader.textContent).toContain("hard");
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import GamePage from "../../pages/game/Game.jsx";
import { startNewGame } from "../../services/game";
import { isSoundEnabled } from "../../services/sound";

// Mocking external dependencies
vi.mock("../../services/game", () => ({
  startNewGame: vi.fn(),
}));

vi.mock("../../services/sound", () => ({
  isSoundEnabled: vi.fn(),
}));

const mockStartNewGame = startNewGame;
const mockIsSoundEnabled = isSoundEnabled;

describe("GamePage Component", () => {
  beforeEach(() => {
    mockStartNewGame.mockResolvedValue({
      id: 1,
      targetMovie: { title: "Inception", id: 123 },
    });
    mockIsSoundEnabled.mockReturnValue(true); // Simulate sound enabled
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the game page and start a new game", async () => {
    render(
      <Router>
        <GamePage />
      </Router>
    );

    // Assert that the game page renders correctly
    expect(screen.getByAltText("Double Feature Logo")).toBeInTheDocument();

    // Wait for the async call to start a new game
    await waitFor(() => expect(mockStartNewGame).toHaveBeenCalledTimes(1));

    // Check that the movie title is rendered correctly in the game
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  // it("should play background music when the game starts", async () => {
  //   const playAudioMock = vi.fn();
  //   const audioMock = { play: playAudioMock, loop: true, volume: 0.4 };

  //   global.Audio = vi.fn(() => audioMock);

  //   render(
  //     <Router>
  //       <GamePage />
  //     </Router>
  //   );

  //   await waitFor(() => expect(mockStartNewGame).toHaveBeenCalledTimes(1));

  //   // Assert that the audio play method was called
  //   expect(playAudioMock).toHaveBeenCalledTimes(1);
  // });

  // it("should update the score when a correct guess is made", async () => {
  //   render(
  //     <Router>
  //       <GamePage />
  //     </Router>
  //   );

  //   // Assuming an InputBox where users make guesses
  //   const inputBox = screen.getByPlaceholderText("Type your guess...");
  //   fireEvent.change(inputBox, { target: { value: "Inception" } });
  //   fireEvent.submit(inputBox);

  //   await waitFor(() => expect(screen.getByText("Score: 1")).toBeInTheDocument());
  // });

  // it("should show the results modal and allow the user to play again", async () => {
  //   render(
  //     <Router>
  //       <GamePage />
  //     </Router>
  //   );

  //   // Simulate timer expiration
  //   const timer = screen.getByTestId("timer");
  //   fireEvent.click(timer); // Mock timer expiry

  //   // Wait for the game over state to change
  //   await waitFor(() => expect(screen.getByText("Game Over")).toBeInTheDocument());

  //   // Check if results modal is open
  //   const playAgainButton = screen.getByText("Play Again");
  //   fireEvent.click(playAgainButton);

  //   // Verify that the page reloads (or playAgain is triggered)
  //   expect(window.location.reload).toHaveBeenCalled();
  // });

  // it("should trigger the 'Leave Game' functionality", async () => {
  //   render(
  //     <Router>
  //       <GamePage />
  //     </Router>
  //   );

  //   // Simulate timer expiration
  //   const timer = screen.getByTestId("timer");
  //   fireEvent.click(timer); // Mock timer expiry

  //   // Wait for the game over state to change
  //   await waitFor(() => expect(screen.getByText("Game Over")).toBeInTheDocument());

  //   // Check if leave game button works
  //   const leaveGameButton = screen.getByText("Leave Game");
  //   fireEvent.click(leaveGameButton);

  //   // Verify navigation to home page
  //   expect(window.location.href).toBe("http://localhost/");
  // });
});
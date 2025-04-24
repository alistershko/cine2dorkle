import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { startNewGame, guessMovie } from "../services/game";

// Mock the fetch API
global.fetch = vi.fn();

// Set a mock value for the environment variable
vi.stubEnv("VITE_BACKEND_URL", "http://localhost:3000");

describe("Game Services", () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("startNewGame", () => {
    it("successfully fetches and returns game data", async () => {
      // Mock response data
      const mockGameData = {
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

      // Set up the mock fetch to return the mock data
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGameData,
      });

      // Call the service
      const result = await startNewGame();

      // Verify the service made the correct API call
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/game/gameStart",
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      // Verify the service returned the expected data
      expect(result).toEqual(mockGameData);
    });

    it("throws an error when the API call fails", async () => {
      // Set up the mock fetch to throw an error
      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      // Verify the service throws an error
      await expect(startNewGame()).rejects.toThrow("Network error");

      // Verify the service logged the error
      expect(console.error).toHaveBeenCalled;
    });
  });

  describe("guessMovie", () => {
    it("successfully submits a guess and returns result data", async () => {
      // Mock response data for a successful guess
      const mockGuessResult = {
        guessedMovie: {
          id: 27205,
          title: "Inception",
          release_date: "2010-07-16",
          poster_path: "/path/to/poster.jpg",
        },
        matchingCast: [
          { name: "Leonardo DiCaprio", id: 6193, usageCount: 1 },
          { name: "Tom Hardy", id: 2524, usageCount: 1 },
        ],
      };

      // Set up the mock fetch to return the mock data
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGuessResult,
      });

      // Call the service with test parameters
      const result = await guessMovie("Inception", "2010", 11688);

      // Verify the service made the correct API call
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/game/guess", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie_title: "Inception",
          movie_release_year: "2010",
          target_movie_id: 11688,
        }),
      });

      // Verify the service returned the expected data
      expect(result).toEqual(mockGuessResult);
    });

    it("returns error response when the guess is invalid", async () => {
      // Mock response data for an invalid guess
      const mockErrorResponse = {
        error: "Movie has already been played",
      };

      // Set up the mock fetch to return an error response
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse,
      });

      // Call the service with test parameters
      const result = await guessMovie("Inception", "2010", 11688);

      // Verify the service returned the error response
      expect(result).toEqual(mockErrorResponse);
    });

    it("handles API errors when submitting a guess", async () => {
      // Set up the mock fetch to throw an error
      global.fetch.mockRejectedValueOnce(new Error("API connection error"));

      // Verify the service throws an error
      await expect(guessMovie("Inception", "2010", 11688)).rejects.toThrow(
        "API connection error"
      );
    });
  });
});

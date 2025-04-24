import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getMovies,
  getInitialMovie,
  getGuessedMovie,
  getCastFromMovieId,
  getSearchResults,
} from "../services/movies";

// Mock fetch
global.fetch = vi.fn();

// Set a mock value for the environment variable
vi.stubEnv("VITE_BACKEND_URL", "http://localhost:3000");

describe("Movie Services", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  describe("getMovies", () => {
    it("successfully fetches all movies", async () => {
      // Mock response data
      const mockMovies = [
        {
          id: 123,
          title: "Inception",
          release_date: "2010-07-16",
          poster_path: "/path/to/poster.jpg",
        },
        {
          id: 456,
          title: "The Dark Knight",
          release_date: "2008-07-18",
          poster_path: "/path/to/another/poster.jpg",
        },
      ];

      // Set up the mock fetch to return the mock data
      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => mockMovies,
      });

      // Call the service
      const result = await getMovies();

      // Verify the service made the correct API call
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/movies", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      // Verify the service returned the expected data
      expect(result).toEqual(mockMovies);
    });

    it("throws an error when the API call fails", async () => {
      // Set up the mock fetch to return an error response
      global.fetch.mockResolvedValueOnce({
        status: 500,
      });

      // Verify the service throws an error
      await expect(getMovies()).rejects.toThrow("Failed to fetch movies");
    });
  });

  describe("getInitialMovie", () => {
    it("successfully fetches the initial movie", async () => {
      // Mock response data
      const mockMovie = {
        id: 123,
        title: "Inception",
        release_date: "2010-07-16",
        poster_path: "/path/to/poster.jpg",
      };

      // Set up the mock fetch to return the mock data
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockMovie,
      });

      // Call the service
      const result = await getInitialMovie();

      // Verify the service made the correct API call
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/tmdb/initialMovie",
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      // Verify the service returned the expected data
      expect(result).toEqual(mockMovie);
    });

    it("throws an error when the API call fails", async () => {
      // Set up the mock fetch to return an error response
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => "Internal Server Error",
      });

      // Verify the service throws an error
      await expect(getInitialMovie()).rejects.toThrow(
        "Failed to fetch initial movie: 500"
      );
    });
  });

  describe("getGuessedMovie", () => {
    it("successfully fetches the guessed movie", async () => {
      // Mock response data
      const mockMovie = {
        id: 123,
        title: "Inception",
        release_date: "2010-07-16",
        poster_path: "/path/to/poster.jpg",
      };

      // Set up the mock fetch to return the mock data
      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => mockMovie,
      });

      // Call the service
      const result = await getGuessedMovie("Inception");

      // Verify the service made the correct API call
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/movie/Inception",
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      // Verify the service returned the expected data
      expect(result).toEqual(mockMovie);
    });

    it("throws an error when the API call fails", async () => {
      // Set up the mock fetch to return an error response
      global.fetch.mockResolvedValueOnce({
        status: 404,
      });

      // Verify the service throws an error
      await expect(getGuessedMovie("NonExistentMovie")).rejects.toThrow(
        "Failed to fetch guessed movie"
      );
    });
  });

  describe("getCastFromMovieId", () => {
    it("successfully fetches the cast for a movie", async () => {
      // Mock response data
      const mockCast = [
        { name: "Leonardo DiCaprio", id: 6193 },
        { name: "Joseph Gordon-Levitt", id: 24045 },
      ];

      // Set up the mock fetch to return the mock data
      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => mockCast,
      });

      // Call the service
      const result = await getCastFromMovieId(123);

      // Verify the service made the correct API call
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/tmdb/cast/123",
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      // Verify the service returned the expected data
      expect(result).toEqual(mockCast);
    });

    it("throws an error when the API call fails", async () => {
      // Set up the mock fetch to return an error response
      global.fetch.mockResolvedValueOnce({
        status: 404,
      });

      // Verify the service throws an error
      await expect(getCastFromMovieId(999)).rejects.toThrow(
        "Failed to fetch cast"
      );
    });
  });

  describe("getSearchResults", () => {
    it("successfully fetches search results", async () => {
      // Mock response data
      const mockResults = [
        {
          id: 123,
          title: "Inception",
          release_date: "2010-07-16",
        },
        {
          id: 124,
          title: "Inception 2",
          release_date: "2020-07-16",
        },
      ];

      // Set up the mock fetch to return the mock data
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResults,
      });

      // Call the service
      const result = await getSearchResults("Inception");

      // Verify the service made the correct API call
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/tmdb/search/Inception",
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      // Verify the service returned the expected data
      expect(result).toEqual(mockResults);
    });

    it("throws an error when the API call fails", async () => {
      // Set up the mock fetch to return an error response
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "Not Found",
      });

      // Verify the service throws an error
      await expect(getSearchResults("NonExistentMovie")).rejects.toThrow(
        "Failed to fetch search result: 404"
      );
    });

    it("handles network errors", async () => {
      // Set up the mock fetch to throw a network error
      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      // Verify the service propagates the error
      await expect(getSearchResults("Inception")).rejects.toThrow(
        "Network error"
      );
    });
  });
});


import { describe, it, expect, vi } from "vitest";
import { getInitialMovie, getCastFromMovieId } from "../../services/movies";

describe("getInitialMovie", () => {
  it("should fetch the initial movie", async () => {
    const mockResponse = { title: "Inception", id: 123 };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const data = await getInitialMovie();
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/tmdb/initialMovie"),
      expect.any(Object)
    );
  });
});

describe("getCastFromMovieId", () => {
    it("should fetch cast data for a given movie ID", async () => {
      const mockResponse = {
        cast: [
          { name: "Leonardo DiCaprio", character: "Cobb" },
          { name: "Joseph Gordon-Levitt", character: "Arthur" },
        ],
      };
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(mockResponse),
        })
      );
      const data = await getCastFromMovieId(123);
      expect(data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/tmdb/cast/123",
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
    });
  });

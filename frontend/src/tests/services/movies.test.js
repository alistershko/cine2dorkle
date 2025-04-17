
import { describe, it, expect, vi } from "vitest";
import { getInitialMovie } from "../../services/movies";

describe("movies.js service functions", () => {
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


const { getRandomMovie, getCastFromMovieId } = require('../../controllers/game');

global.fetch = jest.fn();

describe("getRandomMovie", () => {
    const mockRes = {
        status: jest.fn().mockReturnThis(), // res.status(200) returns res again
        json: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return a random movie", async () => {
        const mockMovie = { 
            original_language: "en",
            title: "Test Movie",
            release_date: "2024-01-01",
            id: 1
        };
        const mockReq = {};

        // Simulate API response
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                results: Array(5).fill(mockMovie)
            })
        });

        await getRandomMovie(mockReq, mockRes);

        expect(fetch).toHaveBeenCalledTimes(10);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
            title: expect.any(String),
            release_date: expect.any(String),
            id: expect.any(Number)
        }));
    });

    it("should handle fetch failure", async () => {
        fetch.mockResolvedValue(new Error("API Error"));

        const mockReq = {};

        await getRandomMovie(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Failed to fetch movie data' });
    });

    it("should returns 404 if no movies found", async () => {
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ results: [] })
        });

        const mockReq = {};

        await getRandomMovie(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ error: "No movies found" });
    });
});

describe("getCastFromMovieId", () => {
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });   
    
    it("should returns cast with name and id only", async () => {
        const req = { params: { id: 123 }};
        const mockCast = [{ name: "Alister", id: 1, extra: "ignore" }]

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ cast: mockCast })
    });

    await getCastFromMovieId(req, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith([{ name: "Alister", id: 1 }])
    });
    
    it("should return 404 if cast not found", async () =>{
        const req = { params: { id: 999 }};

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ cast: [] })
        });

        await getCastFromMovieId(req, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'No cast found' });
    });

    it("should return 500 if fetch fails", async () => {
        const req = { params: { id: 999 }};

        fetch.mockResolvedValue(new Error("API error"));

        await getCastFromMovieId(req, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Failed to fetch movie data' });
    });
});
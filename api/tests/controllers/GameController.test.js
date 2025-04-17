const { startNewGame } = require("../../controllers/GameController");
const tmdb = require("../../controllers/tmdb");

jest.mock("../../controllers/tmdb");

describe("startNewGame", () => {
    const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should start a new game and return a random movie", () => {
        const mockMovie = { 
            title: "Inception",
            id: 42, 
            release_date: "2010-07-16"
        };

        tmdb.getRandomMovie.mockReturnValue(mockMovie);

        startNewGame({}, mockRes);

        expect(tmdb.getRandomMovie).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "New game started",
            startingMovie: mockMovie
        });
    });

    // it("should return 500 if getRandomMovie throws an error", () => {
    //     tmdb.getRandomMovie.mockRejectedValue(new Error("fail"));
    // 
    //     startNewGame({}, mockRes);
    //     
    //     expect(mockRes.status).toHaveBeenCalledWith(500);
    //     expect(mockRes.json).toHaveBeenCalledWith({ error: "Failed to start new game" });
    // });
});

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isSoundEnabled, playSound } from "../services/sound";

describe("Sound Services", () => {
  // Create mocks for Audio and localStorage
  let localStorageMock = {};
  let audioPlayMock;
  let audioConstructorMock;
  // Define testPath at a higher scope so it's available to all tests
  const testPath = "/path/to/sound.mp3";

  beforeEach(() => {
    // Setup localStorage mock
    localStorageMock = {};
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn((key) => localStorageMock[key]),
        setItem: vi.fn((key, value) => {
          localStorageMock[key] = value;
        }),
        removeItem: vi.fn((key) => {
          delete localStorageMock[key];
        }),
      },
      writable: true,
    });

    // Setup Audio mock
    audioPlayMock = vi.fn().mockResolvedValue(undefined);
    audioConstructorMock = vi.fn().mockImplementation(() => ({
      play: audioPlayMock,
    }));

    // Replace global Audio constructor
    global.Audio = audioConstructorMock;

    // Mock console.log
    console.log = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("isSoundEnabled", () => {
    it("returns true by default when localStorage is empty", () => {
      expect(isSoundEnabled()).toBe(true);
      expect(window.localStorage.getItem).toHaveBeenCalledWith("soundEnabled");
    });

    it("returns true when localStorage has 'true'", () => {
      localStorageMock["soundEnabled"] = "true";
      expect(isSoundEnabled()).toBe(true);
      expect(window.localStorage.getItem).toHaveBeenCalledWith("soundEnabled");
    });

    it("returns false when localStorage has 'false'", () => {
      localStorageMock["soundEnabled"] = "false";
      expect(isSoundEnabled()).toBe(false);
      expect(window.localStorage.getItem).toHaveBeenCalledWith("soundEnabled");
    });
  });

  describe("playSound", () => {
    it("plays sound when given a string path and sound is enabled", () => {
      // Sound is enabled by default
      playSound(testPath);

      expect(audioConstructorMock).toHaveBeenCalledWith(testPath);
      expect(audioPlayMock).toHaveBeenCalled();
    });

    it("plays sound when given an Audio object and sound is enabled", () => {
      // Create a mock Audio object that passes instanceof Audio check
      const mockAudio = Object.create(Audio.prototype);
      mockAudio.play = vi.fn().mockResolvedValue(undefined);

      playSound(mockAudio);

      expect(audioConstructorMock).not.toHaveBeenCalled(); // Shouldn't create a new Audio
      expect(mockAudio.play).toHaveBeenCalled();
    });

    it("doesn't play sound when sound is disabled", () => {
      // Set sound as disabled
      localStorageMock["soundEnabled"] = "false";

      playSound(testPath);

      expect(audioConstructorMock).not.toHaveBeenCalled();
      expect(audioPlayMock).not.toHaveBeenCalled();
    });

    it("handles play errors gracefully", async () => {
      // Make the play method reject
      audioPlayMock.mockRejectedValueOnce(new Error("Play failed"));

      // We need to await the potentially asynchronous operation
      await playSound(testPath);

      // Should have tried to play
      expect(audioPlayMock).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith(
        "Error playing sound:",
        expect.any(Error)
      );
    });

    it("handles play errors with Audio objects gracefully", async () => {
      // Create a mock Audio object that passes instanceof Audio check
      const mockAudio = Object.create(Audio.prototype);
      mockAudio.play = vi.fn().mockRejectedValueOnce(new Error("Play failed"));

      // We need to await the potentially asynchronous operation
      await playSound(mockAudio);

      // Should have tried to play
      expect(mockAudio.play).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith(
        "Error playing sound:",
        expect.any(Error)
      );
    });
  });
});

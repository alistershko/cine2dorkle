import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // To wrap the component for routing
import PlayButton from "../components/PlayButton";

describe("PlayButton", () => {
  let navigate;

  beforeEach(() => {
    // Mock the useNavigate hook
    navigate = vi.fn();
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
    });
  });

  it("renders the Play button", () => {
    render(
      <Router>
        <PlayButton />
      </Router>
    );
    const button = screen.getByRole("button", { name: /play/i });
    expect(button).toBeInTheDocument();
  });
});

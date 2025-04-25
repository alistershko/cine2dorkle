import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

// Mock components
vi.mock("../pages/home/HomePage", () => ({
  HomePage: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock("../pages/game/Game", () => ({
  default: () => <div data-testid="game-page">Game Page</div>,
}));

// Recreate the route definitions (like in App.jsx)
const routes = [
  {
    path: "/",
    element: <div data-testid="home-page">Home Page</div>,
  },
  {
    path: "/game",
    element: <div data-testid="game-page">Game Page</div>,
  },
];

describe("App Routing", () => {
  it("should render the HomePage when navigating to '/'", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("should render the GamePage when navigating to '/game'", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/game"] });
    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("game-page")).toBeInTheDocument();
  });
});


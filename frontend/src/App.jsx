import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import GamePage from "./pages/game/Game";
import { HomePage } from "./pages/home/HomePage";

// const NotFoundPage = () => <div data-testid="not-found-page">404 Not Found</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
  // {
  //   path: "*", // Catch-all route for invalid paths
  //   element: <NotFoundPage />,
  // },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import { Game } from "./pages/game/Game";
import { HomePage } from "./pages/home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

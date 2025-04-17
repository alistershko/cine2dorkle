// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import React from "react";

import App from "./App.jsx";
import "./index.css";

const rootElement = document.getElementById("root");

// createRoot(document.getElementById("root")).render(
// <StrictMode>
{
  /* <App /> */
}
{
  /* </StrictMode> */
}
// );

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

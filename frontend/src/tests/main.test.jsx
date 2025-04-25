// import { describe, it, vi, expect, beforeEach } from "vitest";
// import * as ReactDOMClient from "react-dom/client";

// vi.mock("react-dom/client", async () => {
//   const actual = await vi.importActual("react-dom/client");
//   return {
//     ...actual,
//     createRoot: vi.fn(() => ({
//       render: vi.fn(),
//     })),
//   };
// });

// describe("main.jsx", () => {
//   let rootMock;

//   beforeEach(() => {
//     document.body.innerHTML = '<div id="root"></div>';
//     rootMock = {
//       render: vi.fn(),
//     };
//     ReactDOMClient.createRoot.mockReturnValue(rootMock);

//     // Clear the module cache for main.jsx
//     vi.resetModules();
//   });

//   it("should create a React root and render the app", () => {
//     // Re-import after clearing the cache
//     require("../main"); // Corrected path

//     expect(ReactDOMClient.createRoot).toHaveBeenCalledWith(
//       document.getElementById("root")
//     );
//     expect(rootMock.render).toHaveBeenCalled();
//   });
// });
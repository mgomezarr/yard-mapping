import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Create } from "./pages/create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "create",
    element: <Create />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// const root = createRoot(document.getElementById("root"));
// root.render(<App />);

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Create } from "./pages/create";
import { List } from "./pages/list";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "create",
    element: <Create />,
  },
  {
    path: "list",
    element: <List />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

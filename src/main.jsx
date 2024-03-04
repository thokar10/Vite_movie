import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AllMovie from "./Components/AllMovie";
import AddMovie from "./Components/AddMovie";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import EditMovies from "./Components/EditMovies";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AllMovie />,
  },
  {
    path: "/addMovies",
    element: <AddMovie />,
  },
  {
    path: "/editMovies/:movie_id",
    element: <EditMovies />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);

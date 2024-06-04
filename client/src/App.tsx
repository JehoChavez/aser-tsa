import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import "./index.css";

const router = createBrowserRouter([
  { path: "/app", element: <Root /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  console.log("app component rendered");
  return <RouterProvider router={router} />;
}

export default App;

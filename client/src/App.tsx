import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Calendario from "./pages/Calendario";
import Clientes from "./pages/Clientes";
import Cliente from "./pages/Cliente";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Calendario /> },
      { path: "/clientes", element: <Clientes /> },
      { path: "/clientes/:id", element: <Cliente /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

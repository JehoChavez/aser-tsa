import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Calendario from "./pages/Calendario";
import Clientes from "./pages/Clientes";
import Cliente from "./pages/Cliente";
import Polizas from "./pages/Polizas";
import NuevaPoliza from "./pages/NuevaPoliza";
import EditarPoliza from "./pages/EditarPoliza";
import RenovarPoliza from "./pages/RenovarPoliza";
import ReexpedirPoliza from "./pages/ReexpedirPoliza";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Calendario /> },
      { path: "/clientes", element: <Clientes /> },
      { path: "/clientes/:id", element: <Cliente /> },
      { path: "/clientes/:id/nueva", element: <NuevaPoliza /> },
      { path: "/polizas", element: <Polizas /> },
      { path: "/polizas/nueva", element: <NuevaPoliza /> },
      { path: "/polizas/:id/editar", element: <EditarPoliza /> },
      { path: "/polizas/:id/renovar", element: <RenovarPoliza /> },
      { path: "/polizas/:id/reexpedir", element: <ReexpedirPoliza /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

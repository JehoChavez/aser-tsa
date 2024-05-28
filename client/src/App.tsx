import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{ path: "/login", element: <p>Login</p> }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

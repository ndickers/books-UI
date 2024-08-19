import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import PassReset from "./pages/PassReset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confirm from "./pages/Confirm";
import ProtectedRoutes from "./pages/ProtectedRoutes";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <Reset />,
  },
  { path: "/confirmation", element: <Confirm /> },
  {
    path: "/reset-password/reset",
    element: <PassReset />,
  },
  {
    element: <ProtectedRoutes />,
    children: [{ path: "/books", element: <Home /> }],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;

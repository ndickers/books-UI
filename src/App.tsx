import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import PassReset from "./pages/PassReset";
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
  {
    path: "/reset-password/reset",
    element: <PassReset />,
  },
  { path: "/books", element: <Home /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

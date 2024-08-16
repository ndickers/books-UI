import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function ProtectedRoutes() {
  const token: null | string = useAppSelector((state) => state.login.token);

  console.log(token);

  return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
}

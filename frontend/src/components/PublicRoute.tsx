import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../types/type";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectPath: string;
  role: "ADMIN" | "CUSTOMER";
}

const PublicRoute = ({ children, redirectPath, role }: PublicRouteProps) => {
  const token =
    role === "ADMIN"
      ? Cookies.get("token-admin")
      : Cookies.get("token-customer");

  if (!token) return <>{children}</>;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      if (role === "ADMIN") {
        Cookies.remove("token-admin");
      } else {
        Cookies.remove("token-customer");
      }
      return <>{children}</>;
    }

    return <Navigate to={redirectPath} replace />;
  } catch {
    if (role === "ADMIN") {
      Cookies.remove("token-admin");
    } else {
      Cookies.remove("token-customer");
    }
    return <>{children}</>;
  }
};

export default PublicRoute;

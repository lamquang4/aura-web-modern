import { Navigate } from "react-router-dom";
import type { UserRole } from "../types/type";
import { jwtUtil } from "../utils/jwtUtil";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectPath: string;
  role: UserRole;
}

const PublicRoute = ({ children, redirectPath, role }: PublicRouteProps) => {
  const token = jwtUtil.getRawToken(role);

  if (!token) return <>{children}</>;

  try {
    if (jwtUtil.isExpired(role)) {
      jwtUtil.clearToken(role);
      return <>{children}</>;
    }

    return <Navigate to={redirectPath} replace />;
  } catch {
    jwtUtil.clearToken(role);
    return <>{children}</>;
  }
};

export default PublicRoute;

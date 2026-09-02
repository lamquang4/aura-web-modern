import { Navigate } from "react-router-dom";
import type { UserRole } from "../types/type";
import { jwtUtil } from "../utils/jwtUtil";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectPath: string;
  role: UserRole;
}

const PrivateRoute = ({
  children,
  allowedRoles,
  redirectPath = "/login",
  role,
}: PrivateRouteProps) => {
  const token = jwtUtil.getRawToken(role);

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  try {
    if (!jwtUtil.hasRole(role, allowedRoles)) {
      if (jwtUtil.isExpired(role)) {
        jwtUtil.clearToken(role);
      }
      return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
  } catch {
    jwtUtil.clearToken(role);
    return <Navigate to={redirectPath} replace />;
  }
};

export default PrivateRoute;

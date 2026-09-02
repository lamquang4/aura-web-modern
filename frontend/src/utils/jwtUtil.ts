import { jwtDecode } from "jwt-decode";
import { COOKIE_KEYS, COOKIE_OPTIONS } from "../constants/cookie";
import type { JwtPayload, UserRole } from "../types/type";
import { cookieUtil } from "./cookieUtil";

const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};

const getCookieKey = (role: UserRole): string =>
  role === "ADMIN" ? COOKIE_KEYS.ADMIN_TOKEN : COOKIE_KEYS.CUSTOMER_TOKEN;

const getToken = (role: UserRole): string | undefined =>
  cookieUtil.get(getCookieKey(role));

const clearToken = (role: UserRole): void =>
  cookieUtil.remove(getCookieKey(role), COOKIE_OPTIONS);

export const jwtUtil = {
  getRawToken: (role: UserRole): string | undefined => getToken(role),

  getPayload: (role: UserRole): JwtPayload | null => {
    const token = getToken(role);
    return token ? decodeToken(token) : null;
  },

  isExpired: (role: UserRole): boolean => {
    const payload = jwtUtil.getPayload(role);
    return !payload || payload.exp * 1000 <= Date.now();
  },

  hasRole: (role: UserRole, allowedRoles: UserRole[]): boolean => {
    const payload = jwtUtil.getPayload(role);
    return (
      payload !== null &&
      !jwtUtil.isExpired(role) &&
      allowedRoles.includes(payload.role)
    );
  },

  setToken: (role: UserRole, token: string): void => {
    const payload = decodeToken(token);
    if (!payload || payload.exp * 1000 <= Date.now()) {
      return;
    }

    const expires = (payload.exp - Date.now() / 1000) / 86400;
    cookieUtil.set(getCookieKey(role), token, { ...COOKIE_OPTIONS, expires });
  },

  clearToken,
};

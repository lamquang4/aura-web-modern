export const COOKIE_OPTIONS: Omit<Cookies.CookieAttributes, "expires"> = {
  path: "/",
  secure: import.meta.env.PROD,
  sameSite: "lax",
};

export const COOKIE_KEYS = {
  ADMIN_TOKEN: "token-admin",
  CUSTOMER_TOKEN: "token-customer",
} as const;

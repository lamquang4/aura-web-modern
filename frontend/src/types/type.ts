export type UserRole = "CUSTOMER" | "ADMIN";
export type UserStatus = "ACTIVE" | "LOCKED";
export type CardStatus = "ACTIVE" | "INACTIVE";
export type AuthProvider = "GOOGLE" | "LOCAL";
export type OAuth2Provider = "GOOGLE";

// ============ Request ============
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  fullname: string;
  password: string;
}

export interface OAuth2LoginRequest {
  accessToken: string;
  provider: OAuth2Provider;
}

export interface CreateUserRequest {
  email: string;
  fullname: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}

export interface UpdateUserRequest {
  fullname: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}

export interface CreateCardRequest {
  name: string;
  content: string;
  status: CardStatus;
}

export interface UpdateCardRequest {
  name: string;
  content: string;
  status: CardStatus;
}

export interface CreateSavedCardRequest {
  customName: string;
  customContent: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  fontColor: string;
  cardId: string;
}

export interface UpdateSavedCardRequest {
  customName: string;
  customContent: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  fontColor: string;
  cardId: string;
}

// ============ Response ============

export interface ApiResponse<T> {
  message: string;
  data: T;
  totalPages?: number;
  total?: number;
}

export interface ErrorResponse {
  message: string;
  path: string;
  timestamp: string;
}

export interface LoginResponse {
  token: string;
  role: UserRole;
}

export interface UserResponse {
  userId: string;
  email: string;
  fullname: string;
  role: UserRole;
  status: UserStatus;
  provider: AuthProvider;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AccountResponse {
  userId: string;
  email: string;
  fullname: string;
  role: UserRole;
  provider: AuthProvider;
}

export interface CardListItemResponse {
  cardId: string;
  name: string;
  frontImage: string;
  backImage: string | null;
  status: CardStatus;
}

export interface CardDetailResponse {
  cardId: string;
  name: string;
  frontImage: string;
  backImage: string | null;
  status: CardStatus;
  content: string;
}

export interface SavedCardListItemResponse {
  savedCardId: string;
  customName: string;
  createdAt: string;
  card: {
    cardId: string;
    frontImage: string;
    backImage: string | null;
  };
}

export interface SavedCardDetailResponse {
  savedCardId: string;
  customName: string;
  customContent: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  fontColor: string;
  card: {
    cardId: string;
    frontImage: string;
    backImage: string | null;
  };
}

export interface JwtPayload {
  sub: string; // userId
  exp: number;
  iat: number;
  role: UserRole;
}

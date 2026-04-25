// Request

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
  provider: string; // GOOGLE, FACEBOOK
}

export interface CreateUserRequest {
  email: string;
  fullname: string;
  password: string;
  role: "CUSTOMER" | "ADMIN";
  status: "ACTIVE" | "LOCKED";
}

export interface UpdateUserRequest {
  fullname: string;
  password: string;
  role: "CUSTOMER" | "ADMIN";
  status: "ACTIVE" | "LOCKED";
}

export interface CreateCardRequest {
  name: string;
  frontImage: string;
  backImage?: string;
  content: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface UpdateCardRequest {
  name: string;
  frontImage: string;
  backImage?: string;
  content: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface SavedCardRequest {
  customName: string;
  customContent: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  fontColor: string;
  cardId: string;
}

// Response
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
  role: string;
}

export interface UserResponse {
  userId: string;
  email: string;
  fullname: string;
  role: "CUSTOMER" | "ADMIN";
  status: "ACTIVE" | "LOCKED";
  createdAt?: string;
  updatedAt?: string;
}

export interface AccountResponse {
  userId: string;
  email: string;
  fullname: string;
  role: "CUSTOMER" | "ADMIN";
}

export interface CardListItemResponse {
  cardId: string;
  name: string;
  frontImage: string;
  backImage?: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface CardDetailResponse {
  cardId: string;
  name: string;
  frontImage: string;
  backImage?: string;
  status: "ACTIVE" | "INACTIVE";
  content: string;
}

export interface SavedCardListItemResponse {
  savedCardId: string;
  customName: string;
  createdAt: string;
  card: {
    cardId: string;
    frontImage: string;
    backImage?: string;
  };
}

export interface SavedCardDetailResponse {
  savedCardId: string;
  customName: string;
  customContent: string;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  fontColor?: string;
  card: {
    cardId: string;
    frontImage: string;
    backImage?: string;
  };
}

export interface DesignStyle {
  content: string;
  name: string;
  textStyle: TextStyle;
}

export interface TextStyle {
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  fontColor?: string;
}

export interface JwtPayload {
  id: string;
  exp: number;
  iat: number;
  role: "CUSTOMER" | "ADMIN";
}

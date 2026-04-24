// Request

export interface UserRequest {
  email?: string;
  fullname: string;
  password?: string;
  role?: "CUSTOMER" | "ADMIN";
  status?: "ACTIVE" | "LOCKED";
  provider?: string;
}

export interface CardRequest {
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
  role: "ADMIN" | "CUSTOMER";
  exp: number;
}

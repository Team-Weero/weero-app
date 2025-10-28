// 로그인 요청 타입
export interface LoginRequest {
  accountId: string;
  password: string;
  deviceToken: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  deviceToken: string;
}

// API 에러 응답 타입
export interface ApiError {
  message: string;
  status: number;
}

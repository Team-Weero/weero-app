import type { LoginRequest, LoginResponse } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * 로그인 API
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "로그인에 실패했습니다.",
      }));
      throw new Error(error.message || "로그인에 실패했습니다.");
    }

    return response.json();
  }

  /**
   * 토큰 갱신 API (필요시 구현)
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("토큰 갱신에 실패했습니다.");
    }

    return response.json();
  }
}

export default new ApiClient();

import ApiClient from "./client";
import type { LoginRequest, LoginResponse } from "./types";
import AndroidBridge from "../util/AndroidBridge";

/**
 * 로그인 함수
 */
export async function login(
  accountId: string,
  password: string
): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    // FCM 토큰 가져오기
    AndroidBridge.getFirebaseTokenAsync(
      async (deviceToken) => {
        try {
          const loginData: LoginRequest = {
            accountId,
            password,
            deviceToken: deviceToken || "",
          };

          const response = await ApiClient.login(loginData);

          // 로그인 성공 시 Refresh Token 저장
          try {
            AndroidBridge.saveRefreshToken(response.refreshToken);
          } catch (error) {
            console.error("Refresh Token 저장 실패:", error);
            // Refresh Token 저장 실패해도 로그인은 계속 진행
          }

          // Access Token을 localStorage에 저장 (웹뷰 환경)
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem(
            "accessTokenExpiresAt",
            response.accessTokenExpiresAt
          );

          resolve(response);
        } catch (error) {
          reject(error);
        }
      },
      10000 // 10초 타임아웃
    );
  });
}

/**
 * 로그아웃 함수
 */
export function logout(): Promise<void> {
  return new Promise((resolve) => {
    // Refresh Token 삭제
    AndroidBridge.saveRefreshToken("");

    // FCM Token 삭제
    AndroidBridge.deleteFirebaseToken((success) => {
      // Access Token 삭제
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpiresAt");

      console.log("로그아웃 완료, FCM 토큰 삭제:", success);
      resolve();
    });
  });
}

/**
 * Access Token 가져오기
 */
export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

/**
 * 토큰 유효성 검사
 */
export function isTokenValid(): boolean {
  const token = getAccessToken();
  const expiresAt = localStorage.getItem("accessTokenExpiresAt");

  if (!token || !expiresAt) {
    return false;
  }

  // 만료 시간 확인
  const expiryTime = new Date(expiresAt).getTime();
  const currentTime = new Date().getTime();

  return currentTime < expiryTime;
}

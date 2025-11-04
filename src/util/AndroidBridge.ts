interface AndroidInterface {
  // Refresh Token 관리
  saveRefreshToken: (token: string) => void;
  getRefreshToken: () => string;

  // FCM Token 관리 - 동기
  getFirebaseToken: () => string;

  // FCM Token 관리 - 비동기
  getFirebaseTokenAsync: (callbackName: string) => void;
  refreshFirebaseToken: (callbackName: string) => void;
  deleteFirebaseToken: (callbackName: string) => void;
}

class AndroidBridge {
  private static instance: AndroidBridge;
  private android: AndroidInterface | null = null;

  private constructor() {
    this.android = this.isAndroidEnvironment() ? (window as any).Android : null;
  }

  public static getInstance(): AndroidBridge {
    if (!this.instance) {
      this.instance = new AndroidBridge();
    }
    return this.instance;
  }

  public isAndroidEnvironment(): boolean {
    return !!(window as any).Android;
  }

  public saveRefreshToken(token: string): void {
    if (this.android) {
      try {
        this.android.saveRefreshToken(token);
      } catch (error) {
        console.error("saveRefreshToken 호출 실패:", error);
        throw new Error("Refresh Token 저장 실패");
      }
    } else {
      console.warn(
        "안드로이드 환경이 아니라서 saveRefreshToken을 사용할 수 없습니다."
      );
    }
  }

  public getRefreshToken(): string {
    if (this.android) {
      try {
        return this.android.getRefreshToken();
      } catch (error) {
        console.error("getRefreshToken 호출 실패:", error);
        return "";
      }
    } else {
      console.warn(
        "안드로이드 환경이 아니라서 getRefreshToken을 사용할 수 없습니다."
      );
      return "";
    }
  }

  public getFirebaseToken(): string {
    if (this.android) {
      try {
        return this.android.getFirebaseToken();
      } catch (error) {
        console.error("getFirebaseToken 호출 실패:", error);
        return "";
      }
    } else {
      console.warn(
        "안드로이드 환경이 아니라서 getFirebaseToken을 사용할 수 없습니다."
      );
      return "";
    }
  }

  /**
   * Firebase에서 최신 FCM 토큰을 비동기로 가져옵니다.
   * @param callback - 토큰을 받을 콜백 함수
   * @param timeout - 타임아웃 시간 (ms, 기본값: 10000ms)
   */
  public getFirebaseTokenAsync(
    callback: (token: string) => void,
    timeout: number = 10000
  ): void {
    if (this.android) {
      const callbackName = `_fcmCallback_${Date.now()}`;
      let timeoutId: number | null = null;
      let isCallbackCalled = false;

      // 타임아웃 설정
      timeoutId = setTimeout(() => {
        if (!isCallbackCalled) {
          console.error("getFirebaseTokenAsync 타임아웃");
          delete (window as any)[callbackName];
          callback("");
        }
      }, timeout);

      (window as any)[callbackName] = (token: string) => {
        if (!isCallbackCalled) {
          isCallbackCalled = true;
          if (timeoutId) clearTimeout(timeoutId);
          callback(token);
          delete (window as any)[callbackName];
        }
      };

      try {
        this.android.getFirebaseTokenAsync(callbackName);
      } catch (error) {
        console.error("getFirebaseTokenAsync 호출 실패:", error);
        if (timeoutId) clearTimeout(timeoutId);
        delete (window as any)[callbackName];
        callback("");
      }
    } else {
      console.warn(
        "안드로이드 환경이 아니라서 getFirebaseTokenAsync를 사용할 수 없습니다."
      );
      callback("");
    }
  }

  /**
   * 기존 FCM 토큰을 삭제하고 새로운 토큰을 발급받습니다.
   * @param callback - 새 토큰을 받을 콜백 함수
   * @param timeout - 타임아웃 시간 (ms, 기본값: 15000ms)
   */
  public refreshFirebaseToken(
    callback: (token: string) => void,
    timeout: number = 15000
  ): void {
    if (this.android) {
      const callbackName = `_fcmRefreshCallback_${Date.now()}`;
      let timeoutId: number | null = null;
      let isCallbackCalled = false;

      timeoutId = setTimeout(() => {
        if (!isCallbackCalled) {
          console.error("refreshFirebaseToken 타임아웃");
          delete (window as any)[callbackName];
          callback("");
        }
      }, timeout);

      (window as any)[callbackName] = (token: string) => {
        if (!isCallbackCalled) {
          isCallbackCalled = true;
          if (timeoutId) clearTimeout(timeoutId);
          callback(token);
          delete (window as any)[callbackName];
        }
      };

      try {
        this.android.refreshFirebaseToken(callbackName);
      } catch (error) {
        console.error("refreshFirebaseToken 호출 실패:", error);
        if (timeoutId) clearTimeout(timeoutId);
        delete (window as any)[callbackName];
        callback("");
      }
    } else {
      console.warn(
        "안드로이드 환경이 아니라서 refreshFirebaseToken을 사용할 수 없습니다."
      );
      callback("");
    }
  }

  /**
   * FCM 토큰을 완전히 삭제합니다 (Firebase 및 로컬 저장소).
   * @param callback - 삭제 결과를 받을 콜백 함수
   * @param timeout - 타임아웃 시간 (ms, 기본값: 10000ms)
   */
  public deleteFirebaseToken(
    callback: (success: boolean) => void,
    timeout: number = 10000
  ): void {
    if (this.android) {
      const callbackName = `_fcmDeleteCallback_${Date.now()}`;
      let timeoutId: number | null = null;
      let isCallbackCalled = false;

      timeoutId = setTimeout(() => {
        if (!isCallbackCalled) {
          console.error("deleteFirebaseToken 타임아웃");
          delete (window as any)[callbackName];
          callback(false);
        }
      }, timeout);

      (window as any)[callbackName] = (success: boolean) => {
        if (!isCallbackCalled) {
          isCallbackCalled = true;
          if (timeoutId) clearTimeout(timeoutId);
          callback(success);
          delete (window as any)[callbackName];
        }
      };

      try {
        this.android.deleteFirebaseToken(callbackName);
      } catch (error) {
        console.error("deleteFirebaseToken 호출 실패:", error);
        if (timeoutId) clearTimeout(timeoutId);
        delete (window as any)[callbackName];
        callback(false);
      }
    } else {
      console.warn(
        "안드로이드 환경이 아니라서 deleteFirebaseToken을 사용할 수 없습니다."
      );
      callback(false);
    }
  }
}

export default AndroidBridge.getInstance();

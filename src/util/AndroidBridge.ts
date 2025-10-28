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
      this.android.saveRefreshToken(token);
    } else {
      console.warn(
        "안드로이드 환경이 아니라서 saveRefreshToken을 사용할 수 없습니다."
      );
    }
  }

  public getRefreshToken(): string {
    if (this.android) {
      return this.android.getRefreshToken();
    } else {
      console.warn(
        "안드로이드 환경이 아니라서 getRefreshToken을 사용할 수 없습니다."
      );
      return "";
    }
  }

  public getFirebaseToken(): string {
    if (this.android) {
      return this.android.getFirebaseToken();
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
   */
  public getFirebaseTokenAsync(callback: (token: string) => void): void {
    if (this.android) {
      const callbackName = `_fcmCallback_${Date.now()}`;
      (window as any)[callbackName] = (token: string) => {
        callback(token);
        delete (window as any)[callbackName];
      };
      this.android.getFirebaseTokenAsync(callbackName);
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
   */
  public refreshFirebaseToken(callback: (token: string) => void): void {
    if (this.android) {
      const callbackName = `_fcmRefreshCallback_${Date.now()}`;
      (window as any)[callbackName] = (token: string) => {
        callback(token);
        delete (window as any)[callbackName];
      };
      this.android.refreshFirebaseToken(callbackName);
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
   */
  public deleteFirebaseToken(callback: (success: boolean) => void): void {
    if (this.android) {
      const callbackName = `_fcmDeleteCallback_${Date.now()}`;
      (window as any)[callbackName] = (success: boolean) => {
        callback(success);
        delete (window as any)[callbackName];
      };
      this.android.deleteFirebaseToken(callbackName);
    } else {
      console.warn(
        "안드로이드 환경이 아니라서 deleteFirebaseToken을 사용할 수 없습니다."
      );
      callback(false);
    }
  }
}

export default AndroidBridge.getInstance();

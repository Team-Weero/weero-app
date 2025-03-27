interface AndroidInterface {
  saveRefreshToken: (token: string) => void;
  getRefreshToken: () => string;
  getFirebaseToken: () => string;
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
}

export default AndroidBridge.getInstance();

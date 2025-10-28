import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(accountId, password);
      // 로그인 성공 시 메인 페이지로 이동
      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "로그인에 실패했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="p-8">
          {/* 로고 또는 제목 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">안녕하세요</h1>
            <h2 className="text-3xl font-bold text-gray-900">상담쌤님</h2>
          </div>

          {/* 구분선 */}
          <div className="h-1 bg-green-500 my-8"></div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-6 p-4 border border-red-400 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 아이디 입력 */}
            <div>
              <label
                htmlFor="accountId"
                className="block text-lg font-bold text-gray-900 mb-3"
              >
                아이디
              </label>
              <input
                id="accountId"
                type="text"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                required
                className="w-full px-4 py-3 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                placeholder="아이디를 입력하세요"
                disabled={isLoading}
              />
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-bold text-gray-900 mb-3"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                placeholder="비밀번호를 입력하세요"
                disabled={isLoading}
              />
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mt-8"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          {/* 구분선 */}
          <div className="h-1 bg-green-500 my-8"></div>

          {/* 추가 링크 (필요시) */}
          <div className="text-center text-gray-600">
            <p>계정이 없으신가요? 관리자에게 문의하세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

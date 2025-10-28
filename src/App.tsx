import { HashRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Schedule from "./pages/Schedule";
import Home from "./pages/Main";
import Login from "./pages/Login";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* 로그인 페이지 (보호되지 않음) */}
        <Route path="/login" element={<Login />} />

        {/* 보호된 라우트들 */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-100 pb-16">
                <div className="container mx-auto">
                  <Home />
                </div>
                <NavigationBar />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-100 pb-16">
                <div className="container mx-auto">
                  <Schedule />
                </div>
                <NavigationBar />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
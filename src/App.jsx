import { BrowserRouter, Navigate, Route, Routes, Outlet } from "react-router";

import LoginPage from "./pages/login-page";
import DashboardPage from "./pages/dashboard-page";

function ProtectedRoute() {
  return sessionStorage.getItem("user") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

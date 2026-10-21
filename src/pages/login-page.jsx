import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/auth-service";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userServer: "",
    userId: "",
    userPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  async function postLogin(event) {
    event.preventDefault();
    setError("");

    if (!form.userServer.trim() || !form.userId.trim() || !form.userPassword) {
      setError("Semua field wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const user = await login(form);

      sessionStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
          <p className="text-center text-base-content/60 mb-4">
            Masuk ke akun Uruz
          </p>

          {error && (
            <div role="alert" className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={postLogin} className="space-y-4">
            <div className="form-control">
              <label htmlFor="userServer" className="label">
                <span className="label-text">User Server</span>
              </label>

              <input
                id="userServer"
                name="userServer"
                className="input input-bordered w-full"
                value={form.userServer}
                onChange={handleChange}
                autoComplete="organization"
                required
                disabled={loading}
              />
            </div>

            <div className="form-control">
              <label htmlFor="userId" className="label">
                <span className="label-text">User ID</span>
              </label>

              <input
                id="userId"
                name="userId"
                className="input input-bordered w-full"
                value={form.userId}
                onChange={handleChange}
                autoComplete="username"
                required
                disabled={loading}
              />
            </div>

            <div className="form-control">
              <label htmlFor="userPassword" className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                id="userPassword"
                name="userPassword"
                type="password"
                className="input input-bordered w-full"
                value={form.userPassword}
                onChange={handleChange}
                autoComplete="current-password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Memproses...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="divider mt-5 mb-2" />

          <p className="text-center text-xs text-base-content/50">
            Uruz · Authentication Portal
          </p>
        </div>
      </div>
    </main>
  );
}

import { useNavigate } from "react-router";

export default function DashboardPage() {
  const navigate = useNavigate();

  let user = {};

  try {
    user = JSON.parse(sessionStorage.getItem("user") || "{}");
  } catch {
    user = {};
  }

  function handleLogout() {
    sessionStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <main className="min-h-screen bg-base-200">
      <header className="navbar sticky top-0 z-50 border-b border-base-300 bg-base-100 px-4 sm:px-8">
        <div className="flex-1">
          <span className="text-xl font-bold tracking-tight">
            Uruz<span className="text-primary">.</span>
          </span>
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-sm gap-2 rounded-lg text-base-content hover:bg-error/10 hover:text-error"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Logout
        </button>
      </header>

      <section className="max-w-4xl mx-auto p-4 sm:p-8">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="badge badge-success">Login berhasil</div>

            <h1 className="text-2xl font-bold">
              Selamat datang, {user.name || user.id || "User"}!
            </h1>

            <div className="divider" />

            <h2 className="font-semibold">Informasi Pengguna</h2>

            <p>User ID: {user.id || "-"}</p>
            <p>Jabatan: {user.jabatan_name || "-"}</p>
            <p>Group: {user.group_id || "-"}</p>
            <p>Email: {user.email || "-"}</p>

            <div className="divider" />

            <h2 className="font-semibold">Informasi Cabang</h2>

            <p>Cabang: {user.branch_name || "-"}</p>
            <p>Kode cabang: {user.branch_id || "-"}</p>
            <p>Alamat: {user.branch_address || "-"}</p>
            <p>Waktu login: {user.login_time || "-"}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

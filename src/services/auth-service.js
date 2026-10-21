const API_URL = "/api/authV5";
const TIMEOUT = 15000;

export async function login({ userServer, userId, userPassword }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        from_origin: "*",
        userServer: userServer.trim(),
        userId: userId.trim(),
        userPassword,
        envServer: "dev",
        referrer: "bodev.uruz.id",
      }),
    });

    const text = await response.text();

    let result;

    try {
      result = text ? JSON.parse(text) : {};
    } catch {
      throw new Error("Format respons API tidak valid.");
    }

    if (!response.ok) {
      throw new Error(
        result.message ||
          result.error ||
          `Login gagal. HTTP ${response.status}`,
      );
    }

    const user = result.data?.[0];

    if (!user || Number(user.is_login) !== 1) {
      throw new Error(
        result.message ||
          result.error ||
          "Login gagal. Periksa kembali akun kamu.",
      );
    }

    return user;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "Request timeout. Server tidak merespons dalam 15 detik.",
      );
    }

    if (error instanceof TypeError) {
      throw new Error(
        "Gagal terhubung ke server.",
      );
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

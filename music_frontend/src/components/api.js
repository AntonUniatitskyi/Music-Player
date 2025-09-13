// api.js
export async function apiFetch(url, options = {}) {
  let access = localStorage.getItem("access");

  // якщо передаємо FormData — не чіпаємо Content-Type
  const isFormData = options.body instanceof FormData;

  options.headers = {
    ...(options.headers || {}),
    Authorization: access ? `Bearer ${access}` : "",
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    const refresh = localStorage.getItem("refresh");

    if (!refresh) {
      localStorage.removeItem("access");
      throw new Error("Unauthorized");
    }

    const refreshRes = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem("access", data.access);

      // повторний запит
      options.headers.Authorization = `Bearer ${data.access}`;
      response = await fetch(url, options);
    } else {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      throw new Error("Unauthorized");
    }
  }

  return response;
}

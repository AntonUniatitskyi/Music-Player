import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        onLogin();
      } else {
        const errorData = await response.json();
        alert(`Помилка входу: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      console.error(err);
      alert("Помилка: сервер недоступний");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Вхід</h2>

        <label className="block mb-2 text-gray-700 font-medium">Логін</label>
        <input
          className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          type="text"
          placeholder="Введіть логін"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="block mb-2 text-gray-700 font-medium">Пароль</label>
        <input
          className="border p-2 w-full mb-6 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          type="password"
          placeholder="Введіть пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors mb-4"
        >
          Увійти
        </button>

        <p className="text-center text-gray-600">
          Ще немає акаунта?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Зареєструватись
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

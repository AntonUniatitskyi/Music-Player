import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      alert("Паролі не співпадають!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password1, password2 }),
      });

      if (response.ok) {
        alert("Реєстрація успішна! Тепер увійдіть.");
        navigate("/login");
      } else {
        const data = await response.json();
        alert(`Помилка при реєстрації: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      console.error(err);
      alert("Помилка: сервер недоступний");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Реєстрація</h2>

        <label className="block mb-2 text-gray-700 font-medium">Логін</label>
        <input
          className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Введіть логін"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="block mb-2 text-gray-700 font-medium">Email</label>
        <input
          className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          placeholder="Введіть email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-gray-700 font-medium">Пароль</label>
        <input
          className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Введіть пароль"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />

        <label className="block mb-2 text-gray-700 font-medium">Повтори пароль</label>
        <input
          className="border p-2 w-full mb-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Повторіть пароль"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors mb-4"
        >
          Зареєструватись
        </button>

        <p className="text-center text-gray-600">
          Вже є акаунт?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Увійти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;

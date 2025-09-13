import { Link } from "react-router-dom";

export default function Home({ isLoggedIn }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 animate-pulse">
        🎵 Music Player
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center max-w-xl">
        Ласкаво просимо! Слухайте улюблені треки, створюйте плейлисти та насолоджуйтесь музикою онлайн.
      </p>

      <div className="flex gap-4">
        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-indigo-700 transition"
            >
              Увійти
            </Link>
            <Link
              to="/register"
              className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow hover:bg-indigo-50 transition"
            >
              Зареєструватись
            </Link>
          </>
        )}
        {isLoggedIn && (
          <Link
            to="/profile"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-indigo-700 transition"
          >
            Мій профіль
          </Link>
        )}
      </div>

      <footer className="mt-16 text-gray-400 text-sm">
        © 2025 Music Player. Усі права захищені.
      </footer>
    </div>
  );
}

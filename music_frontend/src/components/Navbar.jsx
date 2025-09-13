// Navbar.jsx
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-lg">
        <Link to="/">MyMusicApp</Link>
      </div>

      <div className="flex gap-4">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="hover:text-green-400 transition-colors"
            >
              Увійти
            </Link>
            <Link
              to="/register"
              className="hover:text-blue-400 transition-colors"
            >
              Реєстрація
            </Link>
          </>
        ) : (
          <>
            <Link to="/add-track" className="hover:text-purple-400 transition-colors">
              Додати трек
            </Link>
            <Link
              to="/profile"
              className="hover:text-yellow-400 transition-colors"
            >
              Профіль
            </Link>
            <button
              onClick={onLogout}
              className="hover:text-red-400 transition-colors"
            >
              Вийти
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

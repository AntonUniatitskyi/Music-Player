import { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { apiFetch } from "./api";

function Profile({ onLogout, setTracks, setCurrentIndex, setIsPlaying, tracks, currentIndex, isPlaying }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const userRes = await apiFetch("http://127.0.0.1:8000/api/user/");
        if (!userRes.ok) throw new Error("Unauthorized");
        const userData = await userRes.json();
        setUser(userData);

        const tracksRes = await apiFetch("http://127.0.0.1:8000/api/tracks/");
        if (!tracksRes.ok) throw new Error("Unauthorized");
        const tracksData = await tracksRes.json();
        setTracks(
          Array.isArray(tracksData.results ? tracksData.results : tracksData)
            ? tracksData.results || tracksData
            : []
        );
      } catch (err) {
        console.error("Помилка при ініціалізації:", err);
        if (err.message.includes("Unauthorized")) {
          onLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400 py-10">Завантаження…</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        {user ? `Вітаю, ${user.username}!` : "Не знайдено користувача"}
      </h2>

      <h3 className="text-xl font-semibold mb-4">Треки</h3>

      {tracks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Треків поки нема 😔</p>
      ) : (
        <ul className="divide-y divide-gray-800 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          {tracks.map((track, index) => (
            <li
              key={track.id}
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(true);
              }}
              className={`flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-800 transition ${
                currentIndex === index ? "bg-gray-800" : ""
              }`}
            >
              <span className="w-6 text-gray-400 text-sm">{index + 1}</span>

              {currentIndex === index && isPlaying ? (
                <Pause
                  className="w-5 h-5 cursor-pointer text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(false);
                  }}
                />
              ) : (
                <Play
                  className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                    setIsPlaying(true);
                  }}
                />
              )}

              {track.cover_image ? (
                <img
                  src={track.cover_image}
                  alt={track.title}
                  className="w-12 h-12 object-cover rounded-md shadow"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center text-gray-400">
                  🎵
                </div>
              )}
              <div className="flex-1">
                <p className="font-semibold text-white">{track.title}</p>
                <p className="text-sm text-gray-400">
                  {track.artist || "Unknown Artist"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-8 hover:bg-red-600 block mx-auto"
      >
        Вийти
      </button>
    </div>
  );
}

export default Profile;

import { useState } from "react";
import { apiFetch } from "./api";

function AddTrack() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title || "");
    formData.append("artist", artist || "");
    if (cover) formData.append("cover_image", cover);
    if (!audio) {
        setMessage("❌ Будь ласка, виберіть аудіо файл");
        setLoading(false);
        return;
    }
    formData.append("audio_file", audio);

    try {
      const res = await apiFetch("http://127.0.0.1:8000/api/tracks/", {
        method: "POST",
        body: formData,
        // 👇 важливо: не ставимо Content-Type, інакше зламається
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      const data = await res.json();
      console.log("Відповідь сервера:", data);

      if (!res.ok) {
        console.error("Ошибка сервера:", data);
        const errors = Object.entries(data)
            .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
            .join("; ");
        setMessage("❌ Не вдалося додати трек: " + errors);
        return;
    }
      setMessage("✅ Трек додано!");
      setTitle("");
      setArtist("");
      setCover(null);
      setAudio(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Не вдалося додати трек");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Додати новий трек</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Назва треку"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="text"
          placeholder="Виконавець"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <p>Обложка</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
          className="w-full text-gray-300"
        />

        <p>Аудіо файл</p>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudio(e.target.files[0])}
          className="w-full text-gray-300"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          {loading ? "Завантаження…" : "Додати"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default AddTrack;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import AddTrack from "./components/AddTracks";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access"));
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = currentIndex !== null ? tracks[currentIndex] : null;

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/profile" />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />

        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/profile" />
            ) : (
              <Register onRegister={() => setIsLoggedIn(true)} />
            )
          }
        />

        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile
                onLogout={handleLogout}
                tracks={tracks}
                setTracks={setTracks}
                setCurrentIndex={setCurrentIndex}
                setIsPlaying={setIsPlaying}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/add-track"
          element={isLoggedIn ? <AddTrack /> : <Navigate to="/login" />}
        />
      </Routes>

      {/* 👇 глобальний плеєр */}
      <Player
        track={currentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onPrev={() =>
          setCurrentIndex((prev) =>
            prev > 0 ? prev - 1 : tracks.length - 1
          )
        }
        onNext={() =>
          setCurrentIndex((prev) =>
            prev + 1 < tracks.length ? prev + 1 : 0
          )
        }
      />
    </Router>
  );
}

export default App;

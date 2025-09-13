import { useRef, useEffect, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

function Player({ track, isPlaying, setIsPlaying, onNext, onPrev }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [isPlaying, track]);

  const handleTimeUpdate = () => {
    const { currentTime, duration } = audioRef.current;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
      setCurrentTime(currentTime);
      setDuration(duration);
    }
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime =
      (e.target.value / 100) * audioRef.current.duration;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white border-t border-gray-800 shadow-lg">
      <audio
        ref={audioRef}
        src={track.audio_file}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3 w-1/3">
          {track.cover_image && (
            <img
              src={track.cover_image}
              alt={track.title}
              className="w-12 h-12 object-cover rounded"
            />
          )}
          <div>
            <p className="font-semibold">{track.title}</p>
            <p className="text-sm text-gray-400">
              {track.artist || "Unknown Artist"}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center gap-4 mb-1">
            <SkipBack className="w-5 h-5 cursor-pointer" onClick={onPrev} />
            {isPlaying ? (
              <Pause
                className="w-8 h-8 cursor-pointer"
                onClick={() => setIsPlaying(false)}
              />
            ) : (
              <Play
                className="w-8 h-8 cursor-pointer"
                onClick={() => setIsPlaying(true)}
              />
            )}
            <SkipForward className="w-5 h-5 cursor-pointer" onClick={onNext} />
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <input
              type="range"
              value={progress}
              onChange={handleSeek}
              className="w-full"
            />
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-1/3 justify-end">
          <Volume2 className="w-5 h-5" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue="1"
            onChange={(e) => {
              audioRef.current.volume = e.target.value;
            }}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}

export default Player;

"use client";

import { useEffect, useRef, useState } from "react";
import { weddingData } from "@/lib/wedding-data";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Auto-hide tooltip after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Audio playback prevented:", err);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={weddingData.music.src} loop preload="auto" />

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5">
        {/* Helper tooltip pill */}
        <span
          className={`rounded-full border border-[#b4a078]/30 bg-[#fffdf5]/90 backdrop-blur-md px-3.5 py-1.5 text-[0.72rem] tracking-wide text-[#645032]/85 shadow-[0_4px_20px_rgba(0,0,0,0.08)] whitespace-nowrap transition-all duration-500 pointer-events-none ${
            showTooltip || !isPlaying
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2"
          }`}
        >
          {isPlaying ? "♪ tap to mute" : weddingData.music.label}
        </span>

        {/* Floating play/pause circular button */}
        <button
          type="button"
          aria-label={isPlaying ? "Mute wedding music" : "Play wedding music"}
          onClick={toggleAudio}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#b4a078]/30 bg-[#fffdf5]/90 backdrop-blur-md text-lg shadow-[0_4px_20px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a89988]"
        >
          {isPlaying ? "🔊" : "🔇"}
        </button>
      </div>
    </>
  );
}

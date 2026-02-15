import { useRef, useState, useEffect } from "react";
import violin from "../assets/music/violin.mp3";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Activar música automáticamente al cargar
  useEffect(() => {
    const playMusic = async () => {
      if (!audioRef.current) return;

      try {
        audioRef.current.volume = 0.6;
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        console.log("Audio bloqueado - se activará con el primer click");
      }
    };

    // Intentar reproducir después de un pequeño delay
    const timer = setTimeout(playMusic, 500);

    // Si falla el autoplay, activar con el primer click
    const handleFirstClick = async () => {
      if (!playing && audioRef.current) {
        try {
          audioRef.current.volume = 0.6;
          await audioRef.current.play();
          setPlaying(true);
          document.removeEventListener('click', handleFirstClick);
        } catch (err) {
          console.log("Error al reproducir audio");
        }
      }
    };

    document.addEventListener('click', handleFirstClick, { once: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleFirstClick);
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (!playing) {
        audioRef.current.volume = 0.6;
        await audioRef.current.play();
        setPlaying(true);
      } else {
        audioRef.current.pause();
        setPlaying(false);
      }
    } catch (err) {
      console.log("Audio bloqueado por el navegador");
    }
  };

  return (
    <>
      <audio ref={audioRef} src={violin} loop />

      <button
        onClick={toggleMusic}
        aria-label="Toggle music"
        className="fixed bottom-4 right-4 z-40 bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base hover:bg-white/30 transition-colors shadow-sm"
      >
        {playing ? "🔊 Música" : "🔇 Música"}
      </button>
    </>
  );
}

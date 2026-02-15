import { useState, useEffect } from "react";
import MusicPlayer from "./components/MusicPlayer";
import Countdown from "./components/Countdown";
import ShootingStars from "./components/ShootingStars";
import BirthdayEvent from "./components/BirthdayEvent";

function App() {
  const [birthday, setBirthday] = useState(false);

  // 📅 Calcula el próximo 16 de febrero automáticamente
  const getNextBirthday = () => {
    const today = new Date();
    const year = today.getFullYear();

    let nextBirthday = new Date(year, 1, 16); // Febrero = 1 (0-indexed)
    if (today > nextBirthday) {
      nextBirthday = new Date(year + 1, 1, 16);
    }

    return nextBirthday.toISOString();
  };

  // FECHA DE PRUEBA (comentada - descomentar para testing)
  /*
  const getNextBirthday = () => {
    return new Date(Date.now() + 8000).toISOString();
  };
  */

  const targetDate = getNextBirthday();

  // Verificar si ya pasó la fecha de cumpleaños
  useEffect(() => {
    const checkIfBirthday = () => {
      const today = new Date();
      const birthdayDate = new Date(targetDate);

      // Si ya pasó la fecha, mostrar regalos directamente
      if (today >= birthdayDate) {
        setBirthday(true);
      }
    };

    checkIfBirthday();
  }, [targetDate]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden overflow-x-hidden">
      {/* 🌠 Fondo animado */}
      <ShootingStars />

      {/* 🎻 Música (controlada solo por botón) */}
      <MusicPlayer />

      {/* 🌸 Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {!birthday && (
          <div className="max-w-md w-full mx-auto bg-gradient-to-b from-white/6 to-white/3 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/10">
            <Countdown
              targetDate={targetDate}
              onFinish={() => setBirthday(true)}
            />
          </div>
        )}

        {!birthday && (
          <p className="mt-6 text-sm sm:text-base text-white/70 italic max-w-xl text-center">
            Hasta el 16 de febrero…
          </p>
        )}
      </div>

      {/* 🎉 Evento de cumpleaños */}
      {birthday && <BirthdayEvent />}
    </div>
  );
}

export default App;

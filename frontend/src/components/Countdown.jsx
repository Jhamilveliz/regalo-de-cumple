import { useEffect, useState } from "react";

export default function Countdown({ targetDate, onFinish }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);

      if (!newTime && onFinish) {
        onFinish();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

    if (!timeLeft) {
        return null;
    }


  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <TimeBox label="Días" value={timeLeft.days} />
      <TimeBox label="Horas" value={timeLeft.hours} />
      <TimeBox label="Min" value={timeLeft.minutes} />
      <TimeBox label="Seg" value={timeLeft.seconds} />
    </div>
  );
}

function TimeBox({ label, value }) {
  return (
    <div className="bg-white/6 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 shadow-md">
      <div className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-white/95">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mt-1">
        {label}
      </div>
    </div>
  );
}

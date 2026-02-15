import { useMemo } from "react";

export default function Lilies() {

  // generar posiciones UNA sola vez
  const lilies = useMemo(() => {
    return Array.from({ length: 9 }).map(() => ({
      left: Math.random() * 100,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 8,
      size: 18 + Math.random() * 18,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lilies.map((lily, i) => (
        <span
          key={i}
          className="absolute animate-lily select-none"
          style={{
            left: `${lily.left}%`,
            fontSize: `${lily.size}px`,
            animationDuration: `${lily.duration}s`,
            animationDelay: `${lily.delay}s`,
          }}
        >
          🌸
        </span>
      ))}
    </div>
  );
}

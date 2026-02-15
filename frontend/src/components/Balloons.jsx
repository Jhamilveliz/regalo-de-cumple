import { useMemo } from "react";

export default function Balloons() {
    const balloons = useMemo(() => {
        return Array.from({ length: 6 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 0.8,
            duration: 5 + Math.random() * 3,
            speed: 1 + Math.random() * 0.8,
        }));
    }, []);

    const colors = ["bg-red-400", "bg-blue-400", "bg-yellow-300", "bg-pink-400", "bg-purple-400", "bg-cyan-300"];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {balloons.map((balloon) => (
                <div
                    key={balloon.id}
                    className="absolute bottom-0 flex flex-col items-center opacity-70"
                    style={{
                        left: `${balloon.left}%`,
                        animation: `floatWind ${balloon.duration}s ease-in-out ${balloon.delay}s infinite`,
                    }}
                >
                    {/* Globo */}
                    <div
                        className={`${
                            colors[balloon.id % colors.length]
                        } rounded-full shadow-lg transform transition-transform duration-300`}
                        style={{
                            width: "36px",
                            height: "48px",
                            boxShadow: "inset -3px -6px 6px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.15)",
                        }}
                    />
                    {/* Cuerda */}
                    <div
                        className="bg-gray-300 opacity-50"
                        style={{
                            width: "2px",
                            height: "80px",
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

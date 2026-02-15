import { useMemo, useState, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Lilies from "./Lilies";
import SwitzerlandScene from "./SwitzerlandScene";
import Footer from "./Footer";
import Balloons from "./Balloons";
import Gifts from "./Gifts";

export default function BirthdayEvent() {
    const [step, setStep] = useState(0);

    // Secuencia cinemática: controla la aparición de elementos
    useEffect(() => {
        const timings = [
            { step: 1, delay: 1500 },  // Título
            { step: 2, delay: 4000 },  // Globos
            { step: 3, delay: 6500 },  // Fuegos artificiales INTENSOS (3 segundos)
            { step: 4, delay: 9500 },  // Regalos (después de 3 segundos de fuegos)
        ];

        const timeouts = timings.map(({ step, delay }) =>
            setTimeout(() => setStep(step), delay)
        );

        return () => timeouts.forEach((timeout) => clearTimeout(timeout));
    }, []);

    return (
        <>
            {/* ========================================
                CONTENEDOR PRINCIPAL - FONDO Y DECORACIONES
                ======================================== */}
            <div className="fixed inset-0 z-0 flex flex-col items-center justify-center overflow-hidden pointer-events-none">
                {/* FONDO */}
                <div className="absolute inset-0 z-0 animate-fadeIn">
                    <SwitzerlandScene />
                </div>

                {/* DECORACIONES (NO INTERACTIVAS) */}

                {/* FLORES */}
                <div className="absolute inset-0 z-[5] pointer-events-none opacity-60">
                    <Lilies />
                </div>

                {/* GLOBOS */}
                <div
                    className={`absolute inset-0 z-[5] pointer-events-none transition-opacity duration-1500 ${step >= 2 ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Balloons />
                </div>

                {/* FUEGOS ARTIFICIALES - APARECEN PRIMERO */}
                <div
                    className={`absolute inset-0 z-[5] pointer-events-none transition-opacity duration-1500 ${step >= 3 ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Fireworks />
                </div>

                {/* TÍTULO - ARRIBA DE TODO */}
                <div
                    className={`absolute top-[10%] left-0 right-0 z-20 flex justify-center px-4 sm:px-6 transition-all duration-700 pointer-events-none ${step >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        }`}
                >
                    <div className="w-full max-w-2xl">
                        <AnimatedTitle />
                    </div>
                </div>

                {/* FOOTER */}
                <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 pointer-events-auto">
                    <Footer />
                </div>
            </div>

            {/* ========================================
                REGALOS - CONTENEDOR INDEPENDIENTE
                APARECEN DESPUÉS DE LOS FUEGOS
                ======================================== */}
            <div
                className={`fixed inset-0 z-[9000] flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${step >= 4 ? "opacity-100" : "opacity-0"
                    }`}
            >
                <div className="pointer-events-auto">
                    <Gifts />
                </div>
            </div>
        </>
    );
}

/* FUEGOS ARTIFICIALES REALISTAS CON EXPLOSIONES */
function Fireworks() {
    const explosions = useMemo(() => {
        const colors = ['#ff3366', '#ffd700', '#00ffff', '#00ff88', '#ff69b4', '#9966ff'];
        const explosionCount = 8; // Número de explosiones

        return Array.from({ length: explosionCount }).map(() => {
            const centerX = 20 + Math.random() * 60; // Centros de explosión
            const centerY = 20 + Math.random() * 60;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const particlesPerExplosion = 12;

            // Crear partículas que explotan desde el centro
            const particles = Array.from({ length: particlesPerExplosion }).map((_, i) => {
                const angle = (i / particlesPerExplosion) * Math.PI * 2;
                const distance = 5 + Math.random() * 10;

                return {
                    x: centerX + Math.cos(angle) * distance,
                    y: centerY + Math.sin(angle) * distance,
                    delay: Math.random() * 0.5,
                    size: 1 + Math.random() * 2,
                };
            });

            return { color, particles, delay: Math.random() * 2 };
        });
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {explosions.map((explosion, expIndex) => (
                <div key={expIndex}>
                    {explosion.particles.map((particle, pIndex) => (
                        <span
                            key={`${expIndex}-${pIndex}`}
                            className="absolute rounded-full animate-firework mix-blend-screen"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                backgroundColor: explosion.color,
                                animationDelay: `${explosion.delay + particle.delay}s`,
                                boxShadow: `0 0 ${particle.size * 2}px ${explosion.color}`,
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

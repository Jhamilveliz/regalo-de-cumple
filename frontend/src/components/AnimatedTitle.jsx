export default function AnimatedTitle() {
    const text = "Feliz Cumpleaños";
    const letters = text.split("");

    return (
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white text-center leading-tight tracking-wide">
            {letters.map((letter, i) => (
                <span
                    key={i}
                    className="inline-block animate-letterFade"
                    style={{
                        animationDelay: `${i * 0.08}s`,
                        textShadow: "0 0 30px rgba(120, 160, 255, 0.6), 0 0 60px rgba(147, 112, 219, 0.3)",
                    }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </span>
            ))}
        </h1>
    );
}

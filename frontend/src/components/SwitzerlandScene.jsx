export default function SwitzerlandScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* cielo */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-indigo-900 to-purple-900 z-0" />

      {/* montaña lejana */}
      <div
        className="absolute bottom-0 w-full h-64 md:h-72 lg:h-80 bg-blue-900 opacity-40 z-10"
        style={{
          clipPath:
            "polygon(0% 100%, 10% 60%, 20% 75%, 35% 55%, 50% 70%, 65% 50%, 80% 65%, 100% 45%, 100% 100%)",
        }}
      />

      {/* montaña media */}
      <div
        className="absolute bottom-0 w-full h-72 md:h-80 bg-indigo-900 opacity-60 z-20"
        style={{
          clipPath:
            "polygon(0% 100%, 15% 65%, 30% 80%, 45% 60%, 60% 75%, 75% 55%, 90% 70%, 100% 60%, 100% 100%)",
        }}
      />

      {/* montaña cercana */}
      <div
        className="absolute bottom-0 w-full h-80 md:h-96 bg-blue-950 z-30"
        style={{
          clipPath:
            "polygon(0% 100%, 20% 70%, 40% 85%, 55% 60%, 70% 75%, 85% 65%, 100% 80%, 100% 100%)",
        }}
      />

      {/* niebla */}
      <div className="absolute bottom-0 w-[160%] md:w-[200%] h-40 bg-white/10 blur-3xl animate-fog z-25" />

      <div className="absolute bottom-10 w-[160%] md:w-[200%] h-32 bg-blue-200/10 blur-2xl animate-fog z-22" />

    </div>
  );
}

import { createPortal } from "react-dom";

export default function LetterModal({ message, title, onClose }) {
  console.log("🎁 RENDER MODAL", message);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn p-4"
      onClick={onClose}
    >
      {/* Carta con diseño de la página - RESPONSIVA CON SCROLL */}
      <div
        className="relative max-w-md w-full max-h-[85vh] flex flex-col rounded-3xl shadow-2xl animate-cardPop overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Efecto de brillo */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

        {/* Contenido con scroll */}
        <div className="relative z-10 p-6 sm:p-10 overflow-y-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-white drop-shadow-lg">
            {title}
          </h2>

          <p className="whitespace-pre-line text-left leading-relaxed text-white text-base sm:text-lg font-medium drop-shadow-md">
            {message}
          </p>

          <button
            onClick={onClose}
            className="mt-6 sm:mt-8 w-full bg-white/20 backdrop-blur-sm text-white py-3 px-6 rounded-xl hover:bg-white/30 transition font-semibold text-base sm:text-lg border-2 border-white/30 hover:border-white/50 shadow-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

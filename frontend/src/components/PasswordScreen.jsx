import { useState } from "react";

const CORRECT_PASSWORD = "160207";

export default function PasswordScreen({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-gradient-to-b from-white/6 to-white/3 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border border-white/10">
        <h1 className="text-2xl sm:text-3xl mb-2">🌙 Jardín Secreto 🌙</h1>
        <p className="text-sm mb-4 opacity-80">
          Una fecha especial abre este lugar
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="••••••"
          className="w-full px-4 py-2 rounded-lg text-black text-center outline-none focus:ring-2 focus:ring-blue-300"
        />

        {error && (
          <p className="text-red-300 text-sm mt-2">
            Casi… probá una fecha importante 💙
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-500/90 hover:bg-blue-600 transition-colors rounded-lg py-2 shadow-md"
        >
          Entrar ✨
        </button>
      </div>
    </div>
  );
}

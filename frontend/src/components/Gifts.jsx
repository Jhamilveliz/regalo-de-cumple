import { useState } from "react";
import giftsImage from "../assets/img/regalos.png";
import LetterModal from "./LetterModal";

export default function Gifts() {
  const [openCard, setOpenCard] = useState(null);

  const messages = {
    1: "Isa🤍 Hoy es uno de esos días que merecen celebrarse en grande, porque cumples años.Gracias por ser esa persona que siempre suma, que acompaña, que escucha y que hace que todo se sienta un poquito más fácil. Tu amistad es un regalo enorme en mi vida, de esos que no se explican, solo se sienten. Deseo que este nuevo año te traiga momentos que te hagan sonreír sin pensarlo, sueños que se vayan cumpliendo y mucha paz. Mereces cosas bonitas, personas reales y días llenos de luz. Feliz cumpleaños, Isa vv🤍",
    2: "Isa de mí vida y de mí corazón sé q vas a leer esto el día de tu happy birthday y tengo tantas cosas q decirte pero soy tímida (soy de la FICCT y me arrugó) la verdad desde q las conocí a Laura y a tí y completamos el team por la trata de blancas mí tiempo en la U fue más bonito, siempre recuerdo cada remontada épica o cuando marcabamos posiciones para los parciales, sos una muy linda persona con la q compartimos todas esas experiencias desde ser nius a próximamente ser dinos xdddd, te deseo muchas felicidades y bendiciones para voce por tu día, te queremos un montón todos y nunca te olvides q siempre contas con nosotros vv 🫶🏻",
    3: "Espero que hoy sea un día muy bonito para ti, lleno de momentos felices y cosas que te hagan sonreír. De verdad deseo que te vaya muy bien en todo lo que te propongas, especialmente en tus estudios, porque sé que puedes lograr muchas cosas. Quiero que sepas que siempre puedes contar conmigo. Nunca me molesta ayudar; al contrario, me gusta hacerlo, porque me alegra verte avanzar y que te vaya bien. En este tiempo de conocerte me di cuenta de que tenemos muchas cosas parecidas, no solo en detalles pequeños, sino en la forma de pensar, en nuestras prioridades y en las metas que buscamos. Eso es algo que valoro mucho, porque no es fácil encontrar personas con una energía tan tranquila y enfocada. Aunque estemos en semestres diferentes de la carrera, siempre será un gusto apoyarte cuando lo necesites. Me alegra poder aportar aunque sea un poco para que sigas avanzando y cumpliendo lo que te propones. Gracias por ser alguien especial. Que este nuevo año te traiga tranquilidad, alegría y muchos sueños cumplidos, y que nunca te falten motivos para seguir sonriendo."
  };

  const titles = {
    1: "Carta de Melisa 💝",
    2: "Carta de Aly 🎁",
    3: "Para ti 💝"
  };

  const handleClick = (id) => {
    console.log("🎯 CLICK REGALO", id);
    setOpenCard(id);
  };

  console.log("🎁 Estado openCard:", openCard);

  return (
    <>
      {/* CONTENEDOR REGALOS - pointer-events-auto OBLIGATORIO */}
      <div className="relative pointer-events-auto">

        {/* IMAGEN - pointer-events-none para que NO bloquee botones */}
        <img
          src={giftsImage}
          alt="Regalos"
          className="w-[320px] sm:w-[420px] select-none pointer-events-none"
        />

        {/* ===== BOTONES CLICKEABLES - COMPLETAMENTE INVISIBLES ===== */}

        {/* REGALO 1 - IZQUIERDO (azul pequeño) */}
        <button
          onClick={() => handleClick(1)}
          className="absolute left-[10%] bottom-[22%] w-[18%] h-[38%] z-[80] cursor-pointer pointer-events-auto"
          aria-label="Abrir regalo 1"
        />

        {/* REGALO 2 - CENTRO (amarillo mediano) */}
        <button
          onClick={() => handleClick(2)}
          className="absolute left-[30%] bottom-[20%] w-[45%] h-[25%] z-[80] cursor-pointer pointer-events-auto"
          aria-label="Abrir regalo 2"
        />

        {/* REGALO 3 - DERECHO (verde grande) - BOTÓN TAPA/MOÑO */}
        <button
          onClick={() => handleClick(3)}
          className="absolute right-[15%] top-[30%] w-[45%] h-[22%] z-[80] cursor-pointer pointer-events-auto"
          aria-label="Abrir regalo 3 - tapa"
        />

        {/* REGALO 3 - DERECHO (verde grande) - BOTÓN LATERAL CAJA */}
        <button
          onClick={() => handleClick(3)}
          className="absolute right-[2%] bottom-[25%] w-[18%] h-[40%] z-[80] cursor-pointer pointer-events-auto"
          aria-label="Abrir regalo 3 - lateral"
        />
      </div>

      {/* ================= MODAL - RENDERIZADO DIRECTO ================= */}
      {openCard && (
        <LetterModal
          message={messages[openCard]}
          title={titles[openCard]}
          onClose={() => setOpenCard(null)}
        />
      )}
    </>
  );
}

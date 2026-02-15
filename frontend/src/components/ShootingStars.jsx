import { useEffect, useRef } from 'react';

const ShootingStars = ({
  starCount = 15,          // Número de estrellas visibles
  minSpeed = 2,             // Velocidad mínima
  maxSpeed = 6,             // Velocidad máxima
  minLength = 80,           // Longitud mínima de la estela
  maxLength = 150,          // Longitud máxima
  minSize = 1.5,            // Tamaño mínimo de la cabeza
  maxSize = 3,              // Tamaño máximo
  colors = ['#ffffff', '#ffe9c4', '#d4c2ff'], // Colores posibles
}) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasDimensions = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setCanvasDimensions();

    // Clase para representar una estrella fugaz
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        // Posición inicial aleatoria fuera de la pantalla (arriba o izquierda)
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.3; // Solo en la parte superior
        this.angle = (Math.random() * 20 + 10) * (Math.PI / 180); // Ángulo hacia abajo-derecha
        this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        this.length = Math.random() * (maxLength - minLength) + minLength;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
        this.active = true;
      }

      update() {
        // Movimiento
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Si sale de la pantalla, reiniciar
        if (this.x > width + this.length || this.y > height + this.length) {
          this.reset();
        }
      }

      draw(ctx) {
        if (!this.active) return;

        const headX = this.x;
        const headY = this.y;
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        // Dibujar estela con gradiente
        const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(0.7, this.color);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Dibujar cabeza (punto más brillante)
        ctx.beginPath();
        ctx.arc(headX, headY, this.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Inicializar estrellas
    const initStars = () => {
      const stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(new ShootingStar());
      }
      starsRef.current = stars;
    };
    initStars();

    // Animación
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      starsRef.current.forEach(star => {
        star.update();
        star.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Manejar resize
    const handleResize = () => {
      setCanvasDimensions();
      // Reiniciamos las estrellas para que se adapten al nuevo tamaño
      initStars();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [starCount, minSpeed, maxSpeed, minLength, maxLength, minSize, maxSize, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }} // Detrás de todo el contenido
    />
  );
};

export default ShootingStars;
import React from 'react';

// Define las propiedades que puede recibir el componente (opcional, para tamaño, etc.)
interface NewAlbirLogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const NewAlbirLogo: React.FC<NewAlbirLogoProps> = ({ width = 40, height = 40, className = '' }) => {
  // Inspirado en Tailwind colors: blue-500 (#3B82F6) y emerald-500 (#10B981)
  const mountainColor = "#10B981"; // Verde para la montaña
  const waveColor = "#3B82F6";     // Azul para la ola/mar

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100" // ViewBox cuadrado para facilitar el escalado
      width={width}
      height={height}
      className={className}
      aria-labelledby="albirjobs-logo-title" // Para accesibilidad
    >
      {/* Título para accesibilidad */}
      <title id="albirjobs-logo-title">Logo de AlbirJobs</title>

      {/* Ola estilizada (Curva suave en la parte inferior) */}
      <path
        d="M 0 70 Q 50 100 100 70 L 100 100 L 0 100 Z"
        fill={waveColor}
      />

      {/* Montaña estilizada (Triángulo/pico simplificado encima de la ola) */}
      {/* Ligeramente más alto para que sobresalga */}
      <path
        // Vértices: (Izquierda-Base, Pico-Centro, Derecha-Base)
        // Ajustado para que la base quede 'detrás' de la cresta de la ola
        d="M 25 75 L 50 25 L 75 75 Z"
        fill={mountainColor}
      />
    </svg>
  );
};

export default NewAlbirLogo; 
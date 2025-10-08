/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales armonizados con el logo morado
        primary: {
          purple: '#7c3aed',    // Morado principal (combina con logo)
          violet: '#a855f7',    // Violeta complementario
          gold: '#f59e0b',      // Dorado elegante
          amber: '#f97316',     // Ámbar/naranja
          blue: '#3b82f6',      // Azul vibrante (mantener)
          red: '#ef4444',       // Rojo (mantener)
          dark: '#1f2937',      // Oscuro para fondos
          
          // Aliases para compatibilidad
          teal: '#7c3aed',      // Redirigir teal a morado
          orange: '#f59e0b',    // Cambiar a dorado
        },
        // Colores para los niveles de recompensas (armonizados)
        reward: {
          gold: '#f59e0b',      // Niveles 1-2 (dorado)
          amber: '#f97316',     // Niveles 3-4 (ámbar)
          purple: '#7c3aed',    // Niveles 5-6 (morado principal)
          violet: '#a855f7',    // Niveles 7-8 (violeta)
          indigo: '#6366f1',    // Niveles 9-11 (índigo)
          
          // Aliases para compatibilidad
          yellow: '#f59e0b',
          orange: '#f97316',
          blue: '#7c3aed',
          red: '#6366f1',
        },
        // Neutros cálidos que complementan el morado
        neutral: {
          light: '#fafaf9',     // Blanco cálido
          gray: '#f3f4f6',      // Gris claro cálido
          dark: '#374151',      // Gris oscuro
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
import { useEffect, useRef } from 'react';
import './CursorHearts.css';

export default function CursorHearts() {
  const ultimoRef = useRef(0);

  useEffect(() => {
    function manejarMovimiento(e) {
      const ahora = Date.now();
      if (ahora - ultimoRef.current < 150) return; // limita cuántos corazones se crean
      ultimoRef.current = ahora;

      const corazon = document.createElement('span');
      corazon.className = 'cursor-corazon';
      corazon.textContent = '♥';
      corazon.style.left = `${e.clientX}px`;
      corazon.style.top = `${e.clientY}px`;
      corazon.style.setProperty('--x', `${(Math.random() - 0.5) * 50}px`);

      document.body.appendChild(corazon);
      setTimeout(() => corazon.remove(), 900);
    }

    window.addEventListener('mousemove', manejarMovimiento);
    return () => window.removeEventListener('mousemove', manejarMovimiento);
  }, []);

  return null;
}
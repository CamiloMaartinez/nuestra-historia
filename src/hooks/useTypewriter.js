import { useEffect, useState } from 'react';

export function useTypewriter(texto, activo, velocidad = 16) {
  const [mostrado, setMostrado] = useState('');
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    if (!activo || !texto) {
      setMostrado('');
      setTerminado(false);
      return;
    }

    const sinAnimacion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sinAnimacion) {
      setMostrado(texto);
      setTerminado(true);
      return;
    }

    setMostrado('');
    setTerminado(false);

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setMostrado(texto.slice(0, i));
      if (i >= texto.length) {
        clearInterval(id);
        setTerminado(true);
      }
    }, velocidad);

    return () => clearInterval(id);
  }, [texto, activo, velocidad]);

  return { mostrado, terminado };
}

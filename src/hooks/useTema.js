import { useCallback, useState } from 'react';

export function useTema() {
  const [tema, setTema] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light'
  );

  const alternarTema = useCallback(() => {
    const siguiente = tema === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', siguiente);
    localStorage.setItem('tema', siguiente);
    setTema(siguiente);
  }, [tema]);

  return { tema, alternarTema };
}

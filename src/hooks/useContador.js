import { useState, useEffect } from 'react';
import { FECHA_INICIO } from '../config';

// Suma meses de calendario sin desbordar (31 ene + 1 mes = 28/29 feb).
function sumarMeses(fecha, meses) {
  const resultado = new Date(fecha);
  const dia = resultado.getDate();
  resultado.setDate(1);
  resultado.setMonth(resultado.getMonth() + meses);
  const ultimoDia = new Date(resultado.getFullYear(), resultado.getMonth() + 1, 0).getDate();
  resultado.setDate(Math.min(dia, ultimoDia));
  return resultado;
}

function calcularTiempo() {
  const inicio = new Date(FECHA_INICIO);
  const ahora = new Date();

  // Meses completos de calendario: el día 9 de cada mes se cumple un mes más.
  let mesesTotales =
    (ahora.getFullYear() - inicio.getFullYear()) * 12 + (ahora.getMonth() - inicio.getMonth());
  if (sumarMeses(inicio, mesesTotales) > ahora) mesesTotales -= 1;
  mesesTotales = Math.max(0, mesesTotales);

  let diferencia = Math.max(0, ahora - sumarMeses(inicio, mesesTotales));

  const dias = Math.floor(diferencia / 86400000);
  diferencia -= dias * 86400000;
  const horas = Math.floor(diferencia / 3600000);
  diferencia -= horas * 3600000;
  const minutos = Math.floor(diferencia / 60000);
  diferencia -= minutos * 60000;
  const segundos = Math.floor(diferencia / 1000);

  return {
    anios: Math.floor(mesesTotales / 12),
    meses: mesesTotales % 12,
    dias,
    horas,
    minutos,
    segundos,
  };
}

export function useContador() {
  const [tiempo, setTiempo] = useState(calcularTiempo());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo(calcularTiempo());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return tiempo;
}

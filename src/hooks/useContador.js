import { useState, useEffect } from 'react';
import { FECHA_INICIO } from '../config';

function calcularTiempo() {
  const inicio = new Date(FECHA_INICIO);
  const ahora = new Date();

  let diferencia = ahora - inicio; // milisegundos totales

  const segundosPorUnidad = {
    anio: 1000 * 60 * 60 * 24 * 365.25,
    mes: (1000 * 60 * 60 * 24 * 365.25) / 12,
    dia: 1000 * 60 * 60 * 24,
    hora: 1000 * 60 * 60,
    minuto: 1000 * 60,
    segundo: 1000,
  };

  const anios = Math.floor(diferencia / segundosPorUnidad.anio);
  diferencia -= anios * segundosPorUnidad.anio;

  const meses = Math.floor(diferencia / segundosPorUnidad.mes);
  diferencia -= meses * segundosPorUnidad.mes;

  const dias = Math.floor(diferencia / segundosPorUnidad.dia);
  diferencia -= dias * segundosPorUnidad.dia;

  const horas = Math.floor(diferencia / segundosPorUnidad.hora);
  diferencia -= horas * segundosPorUnidad.hora;

  const minutos = Math.floor(diferencia / segundosPorUnidad.minuto);
  diferencia -= minutos * segundosPorUnidad.minuto;

  const segundos = Math.floor(diferencia / segundosPorUnidad.segundo);

  return { anios, meses, dias, horas, minutos, segundos };
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
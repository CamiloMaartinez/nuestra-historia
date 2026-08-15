export function calcularProximaFecha(mes, dia) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  let proxima = new Date(hoy.getFullYear(), mes - 1, dia);

  // Si esa fecha ya pasó este año, calculamos la del próximo año
  if (proxima < hoy) {
    proxima = new Date(hoy.getFullYear() + 1, mes - 1, dia);
  }

  const msPorDia = 1000 * 60 * 60 * 24;
  const diasFaltantes = Math.round((proxima - hoy) / msPorDia);

  return { fecha: proxima, diasFaltantes };
}
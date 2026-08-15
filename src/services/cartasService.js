import { supabase } from './supabaseClient';

export async function guardarCarta({ titulo, contenido, fecha_carta }) {
  const { data, error } = await supabase
    .from('cartas')
    .insert([{ titulo, contenido, fecha_carta }])
    .select();

  if (error) throw error;
  return data[0];
}

export async function obtenerCartas() {
  const { data, error } = await supabase
    .from('cartas')
    .select('*')
    .order('fecha_carta', { ascending: false });

  if (error) throw error;
  return data;
}
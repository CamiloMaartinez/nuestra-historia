import { supabase } from './supabaseClient';
import { subirImagen } from './fotosService';

export async function guardarRecuerdo({ titulo, descripcion, fecha, archivoFoto }) {
  let url_foto = null;

  if (archivoFoto) {
    url_foto = await subirImagen(archivoFoto);
  }

  const { data, error } = await supabase
    .from('recuerdos')
    .insert([{ titulo, descripcion, fecha, url_foto }])
    .select();

  if (error) throw error;
  return data[0];
}

export async function obtenerRecuerdos() {
  const { data, error } = await supabase
    .from('recuerdos')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) throw error;
  return data;
}
import { supabase } from './supabaseClient';

// Sube el archivo de imagen al bucket "fotos" y devuelve su URL pública
export async function subirImagen(archivo) {
  const nombreUnico = `${Date.now()}-${archivo.name}`;

  const { error: errorSubida } = await supabase.storage
    .from('fotos')
    .upload(nombreUnico, archivo);

  if (errorSubida) throw errorSubida;

  const { data } = supabase.storage.from('fotos').getPublicUrl(nombreUnico);
  return data.publicUrl;
}

// Guarda los datos de la foto (título, descripción, url) en la tabla
export async function guardarFoto({ titulo, descripcion, categoria, url }) {
  const { data, error } = await supabase
    .from('fotos')
    .insert([{ titulo, descripcion, categoria, url }])
    .select();

  if (error) throw error;
  return data[0];
}

// Trae todas las fotos, más recientes primero
export async function obtenerFotos() {
  const { data, error } = await supabase
    .from('fotos')
    .select('*')
    .order('creado_en', { ascending: false });

  if (error) throw error;
  return data;
}
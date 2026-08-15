import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { subirImagen, guardarFoto, obtenerFotos } from '../services/fotosService';
import './Fotos.css';

export default function Fotos() {
  const { t } = useTranslation();
  const { estaAutenticado } = useAuth();
  const [fotos, setFotos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [subiendo, setSubiendo] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('general');
  const [archivo, setArchivo] = useState(null);
  const [fotoAmpliada, setFotoAmpliada] = useState(null);

  useEffect(() => {
    cargarFotos();
  }, []);

  async function cargarFotos() {
    setCargando(true);
    try {
      const datos = await obtenerFotos();
      setFotos(datos);
    } catch (error) {
      console.error('Error al cargar fotos:', error);
    } finally {
      setCargando(false);
    }
  }

  async function manejarSubida(e) {
    e.preventDefault();
    if (!archivo) return;

    setSubiendo(true);
    try {
      const url = await subirImagen(archivo);
      await guardarFoto({ titulo, descripcion, categoria, url });
      setTitulo('');
      setDescripcion('');
      setCategoria('general');
      setArchivo(null);
      e.target.reset();
      await cargarFotos();
    } catch (error) {
      console.error('Error al subir la foto:', error);
      alert('Hubo un error al subir la foto. Revisa la consola.');
    } finally {
      setSubiendo(false);
    }
  }

  return (
    <div className="fotos-page">
      <h1 className="fotos-page__title">{t('photos.title')}</h1>

      {estaAutenticado && (
        <form className="fotos-form" onSubmit={manejarSubida}>
          <h2 className="fotos-form__title">{t('photos.upload_title')}</h2>

          <input
            type="text"
            placeholder={t('photos.field_title')}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder={t('photos.field_description')}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            type="text"
            placeholder={t('photos.field_category')}
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setArchivo(e.target.files[0])}
            required
          />

          <button type="submit" disabled={subiendo}>
            {subiendo ? t('photos.uploading') : t('photos.upload_button')}
          </button>
        </form>
      )}

      {!cargando && fotos.length === 0 && (
        <p className="fotos-empty">{t('photos.empty')}</p>
      )}

      <div className="fotos-grid">
        {fotos.map((foto) => (
          <button
            key={foto.id}
            className="fotos-grid__item"
            onClick={() => setFotoAmpliada(foto)}
          >
            <img src={foto.url} alt={foto.titulo || ''} loading="lazy" />
          </button>
        ))}
      </div>

      {fotoAmpliada && (
        <div className="fotos-modal" onClick={() => setFotoAmpliada(null)}>
          <div className="fotos-modal__content" onClick={(e) => e.stopPropagation()}>
            <img src={fotoAmpliada.url} alt={fotoAmpliada.titulo || ''} />
            {fotoAmpliada.titulo && <h3>{fotoAmpliada.titulo}</h3>}
            {fotoAmpliada.descripcion && <p>{fotoAmpliada.descripcion}</p>}
            <button className="fotos-modal__cerrar" onClick={() => setFotoAmpliada(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}
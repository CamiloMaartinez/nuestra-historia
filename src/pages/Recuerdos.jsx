import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { guardarRecuerdo, obtenerRecuerdos } from '../services/recuerdosService';
import './Recuerdos.css';

export default function Recuerdos() {
  const { t, i18n } = useTranslation();
  const { estaAutenticado } = useAuth();
  const [recuerdos, setRecuerdos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));
  const [archivoFoto, setArchivoFoto] = useState(null);

  useEffect(() => {
    cargarRecuerdos();
  }, []);

  async function cargarRecuerdos() {
    setCargando(true);
    try {
      const datos = await obtenerRecuerdos();
      setRecuerdos(datos);
    } catch (error) {
      console.error('Error al cargar recuerdos:', error);
    } finally {
      setCargando(false);
    }
  }

  async function manejarGuardado(e) {
    e.preventDefault();
    setGuardando(true);
    try {
      await guardarRecuerdo({ titulo, descripcion, fecha, archivoFoto });
      setTitulo('');
      setDescripcion('');
      setFecha(new Date().toISOString().slice(0, 10));
      setArchivoFoto(null);
      e.target.reset();
      await cargarRecuerdos();
    } catch (error) {
      console.error('Error al guardar el recuerdo:', error);
      alert('Hubo un error al guardar el recuerdo. Revisa la consola.');
    } finally {
      setGuardando(false);
    }
  }

  function formatearFecha(fechaISO) {
    return new Date(fechaISO + 'T00:00:00').toLocaleDateString(
      i18n.language === 'es' ? 'es-ES' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  }

  return (
    <div className="recuerdos-page">
      <h1 className="recuerdos-page__title">{t('memories.title')}</h1>

      {estaAutenticado && (
        <form className="recuerdo-form" onSubmit={manejarGuardado}>
          <h2 className="recuerdo-form__title">{t('memories.new_title')}</h2>

          <input
            type="text"
            placeholder={t('memories.field_title')}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <label className="recuerdo-form__label">
            {t('memories.field_date')}
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </label>

          <textarea
            placeholder={t('memories.field_description')}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
          />

          <label className="recuerdo-form__label">
            {t('memories.field_photo')}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setArchivoFoto(e.target.files[0])}
            />
          </label>

          <button type="submit" disabled={guardando}>
            {guardando ? t('memories.saving') : t('memories.save_button')}
          </button>
        </form>
      )}

      {!cargando && recuerdos.length === 0 && (
        <p className="recuerdos-empty">{t('memories.empty')}</p>
      )}

      <div className="recuerdos-lista">
        {recuerdos.map((r) => (
          <article className="recuerdo-card" key={r.id}>
            {r.url_foto && (
              <img className="recuerdo-card__img" src={r.url_foto} alt={r.titulo} loading="lazy" />
            )}
            <div className="recuerdo-card__contenido">
              <span className="recuerdo-card__fecha eyebrow">{formatearFecha(r.fecha)}</span>
              <h3 className="recuerdo-card__titulo">{r.titulo}</h3>
              {r.descripcion && <p className="recuerdo-card__desc">{r.descripcion}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { guardarCarta, obtenerCartas } from '../services/cartasService';
import './Cartas.css';
import Seal from '../components/Seal';

export default function Cartas() {
  const { t, i18n } = useTranslation();
  const { estaAutenticado } = useAuth();
  const [cartas, setCartas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));
  const [cartaAbierta, setCartaAbierta] = useState(null);

  useEffect(() => {
    cargarCartas();
  }, []);

  async function cargarCartas() {
    setCargando(true);
    try {
      const datos = await obtenerCartas();
      setCartas(datos);
    } catch (error) {
      console.error('Error al cargar cartas:', error);
    } finally {
      setCargando(false);
    }
  }

  async function manejarGuardado(e) {
    e.preventDefault();
    setGuardando(true);
    try {
      await guardarCarta({ titulo, contenido, fecha_carta: fecha });
      setTitulo('');
      setContenido('');
      setFecha(new Date().toISOString().slice(0, 10));
      await cargarCartas();
    } catch (error) {
      console.error('Error al guardar la carta:', error);
      alert('Hubo un error al guardar la carta. Revisa la consola.');
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
    <div className="cartas-page">
      <h1 className="cartas-page__title">{t('letters.title')}</h1>

      {estaAutenticado && (
        <form className="carta-form" onSubmit={manejarGuardado}>
          <h2 className="carta-form__title">{t('letters.new_title')}</h2>

          <input
            type="text"
            placeholder={t('letters.field_title')}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <label className="carta-form__label">
            {t('letters.field_date')}
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </label>

          <textarea
            placeholder={t('letters.field_content')}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows={6}
            required
          />

          <button type="submit" disabled={guardando}>
            {guardando ? t('letters.saving') : t('letters.save_button')}
          </button>
        </form>
      )}

      {!cargando && cartas.length === 0 && (
        <p className="cartas-empty">{t('letters.empty')}</p>
      )}

      <div className="sobres-grid">
        {cartas.map((carta) => (
          <button
            key={carta.id}
            className="sobre"
            onClick={() => setCartaAbierta(carta)}
          >
            <span className="sobre__icono">✉</span>
            <span className="sobre__titulo">{carta.titulo}</span>
            <span className="sobre__fecha eyebrow">{formatearFecha(carta.fecha_carta)}</span>
          </button>
        ))}
      </div>

      {cartaAbierta && (
        <div className="carta-modal" onClick={() => setCartaAbierta(null)}>
          <div className="carta-modal__hoja" onClick={(e) => e.stopPropagation()}>
            <div className="carta-modal__sello">
              <Seal size={44} initials="♥" />
            </div>
            <span className="carta-modal__fecha eyebrow">
              {formatearFecha(cartaAbierta.fecha_carta)}
            </span>
            <h2 className="carta-modal__titulo">{cartaAbierta.titulo}</h2>
            <p className="carta-modal__contenido">{cartaAbierta.contenido}</p>
            <button className="carta-modal__cerrar" onClick={() => setCartaAbierta(null)}>
              {t('letters.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
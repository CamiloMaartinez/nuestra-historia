import { useEffect, useState } from 'react';
import { obtenerFotos } from '../services/fotosService';
import './FotoCollage.css';

export default function FotoCollage() {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    obtenerFotos()
      .then((datos) => setFotos(datos.slice(0, 4)))
      .catch(() => setFotos([]));
  }, []);

  if (fotos.length === 0) return null;

  return (
    <div className="foto-collage">
      {fotos.map((foto, i) => (
        <div className={`foto-collage__item foto-collage__item--${i}`} key={foto.id}>
          <img src={foto.url} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
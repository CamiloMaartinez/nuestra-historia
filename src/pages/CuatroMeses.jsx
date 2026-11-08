import { useEffect, useState } from 'react';
import Seal from '../components/Seal';
import Contador from '../components/Contador';
import Reveal from '../components/Reveal';
import {
  CLAVES,
  PISTA,
  numeros,
  diccionario,
  reencuentros,
  pendientes,
  DICIEMBRE,
  posdata,
} from '../data/cuatroMeses';
import './CuatroMeses.css';

const LLAVE_GUARDADA = 'cuatro-meses-abierto';

function normalizar(texto) {
  return texto.replace(/[\s/.-]/g, '');
}

function yaAbierto() {
  try {
    return sessionStorage.getItem(LLAVE_GUARDADA) === '1';
  } catch {
    return false;
  }
}

function diasParaDiciembre() {
  const ms = new Date(DICIEMBRE) - new Date();
  return Math.max(0, Math.ceil(ms / 86400000));
}

export default function CuatroMeses() {
  const [abierto, setAbierto] = useState(yaAbierto);
  const [intento, setIntento] = useState('');
  const [error, setError] = useState(false);
  const [dias, setDias] = useState(diasParaDiciembre);

  useEffect(() => {
    const id = setInterval(() => setDias(diasParaDiciembre()), 60000);
    return () => clearInterval(id);
  }, []);

  function probarClave(e) {
    e.preventDefault();
    if (CLAVES.includes(normalizar(intento))) {
      setAbierto(true);
      try {
        sessionStorage.setItem(LLAVE_GUARDADA, '1');
      } catch {
        // sin almacenamiento: solo se pedirá la clave otra vez
      }
    } else {
      setError(true);
    }
  }

  if (!abierto) {
    return (
      <section className="cm-candado">
        <Seal size={64} initials="4" />
        <span className="eyebrow">Capítulo nuevo</span>
        <h1 className="cm-candado__titulo">Esta página está sellada</h1>
        <p className="cm-candado__pista">{PISTA}</p>
        <form className="cm-candado__form" onSubmit={probarClave}>
          <label htmlFor="cm-clave" className="sr-only">Clave</label>
          <input
            id="cm-clave"
            inputMode="numeric"
            autoComplete="off"
            placeholder="DD MM"
            value={intento}
            onChange={(e) => {
              setIntento(e.target.value);
              setError(false);
            }}
          />
          <button type="submit">Abrir</button>
        </form>
        <p className="cm-candado__error" role="status">
          {error ? 'Casi… piensa en el principio de todo.' : ''}
        </p>
      </section>
    );
  }

  return (
    <div className="cm">
      <header className="cm-hero">
        <span className="eyebrow">9 de noviembre de 2026</span>
        <h1 className="cm-hero__titulo">
          Cuatro <em>meses</em>
        </h1>
        <p className="cm-hero__sub">Nuestro mundo, en pequeño</p>
      </header>

      <Contador />

      <section className="cm-numeros" aria-label="Nuestros números">
        <span className="eyebrow">Cuatro meses en números</span>
        <div className="cm-numeros__grid">
          {numeros.map((n) => (
            <div className="cm-numero" key={n.label}>
              <span className="cm-numero__valor">{n.valor}</span>
              <span className="cm-numero__label">{n.label}</span>
            </div>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="cm-bloque" aria-labelledby="cm-dic">
          <span className="eyebrow">Solo nosotros lo entendemos</span>
          <h2 id="cm-dic" className="cm-bloque__titulo">Nuestro diccionario</h2>
          <dl className="cm-dic">
            {diccionario.map((d) => (
              <div className="cm-dic__entrada" key={d.palabra}>
                <dt>
                  <span className="cm-dic__palabra">{d.palabra}</span>
                  <span className="cm-dic__tipo">{d.tipo}</span>
                </dt>
                <dd>{d.def}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      <Reveal>
        <section className="cm-bloque" aria-labelledby="cm-boletos">
          <span className="eyebrow">Kilómetros que valieron la pena</span>
          <h2 id="cm-boletos" className="cm-bloque__titulo">Cinco reencuentros</h2>
          <ol className="cm-boletos">
            {reencuentros.map((r, i) => (
              <li className="cm-boleto" key={r.fecha}>
                <span className="cm-boleto__num">0{i + 1}</span>
                <div className="cm-boleto__cuerpo">
                  <span className="cm-boleto__fecha">{r.fecha}</span>
                  <span className="cm-boleto__lugar">{r.lugar}</span>
                  <span className="cm-boleto__nota">{r.nota}</span>
                </div>
                <span className="cm-boleto__sello" aria-hidden="true">♥</span>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      <Reveal>
        <section className="cm-bloque" aria-labelledby="cm-pend">
          <span className="eyebrow">Lo que ya hicimos y lo que viene</span>
          <h2 id="cm-pend" className="cm-bloque__titulo">Nuestra lista</h2>
          <ul className="cm-lista">
            {pendientes.map((p) => (
              <li key={p.texto} className={p.hecho ? 'cm-lista__item is-hecho' : 'cm-lista__item'}>
                <span className="cm-lista__check" aria-hidden="true">{p.hecho ? '✓' : ''}</span>
                <span>{p.texto}</span>
                <span className="sr-only">{p.hecho ? '(hecho)' : '(pendiente)'}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="cm-proximo">
          <span className="eyebrow">Cuenta regresiva</span>
          <p className="cm-proximo__dias">{dias}</p>
          <h2 className="cm-proximo__titulo">días para nuestro primer diciembre</h2>
        </section>
      </Reveal>

      <Reveal>
        <p className="cm-posdata">
          <span className="cm-posdata__pd">P. D.</span> {posdata}
        </p>
      </Reveal>
    </div>
  );
}

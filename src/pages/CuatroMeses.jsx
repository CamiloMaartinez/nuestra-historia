import { useState } from 'react';
import Seal from '../components/Seal';
import Contador from '../components/Contador';
import Reveal from '../components/Reveal';
import { CLAVES, PISTA, numeros, meses, carta, proximoCapitulo } from '../data/cuatroMeses';
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

export default function CuatroMeses() {
  const [abierto, setAbierto] = useState(yaAbierto);
  const [intento, setIntento] = useState('');
  const [error, setError] = useState(false);

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
        <p className="cm-hero__sub">Lo que pasó después del sí</p>
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

      <section className="cm-linea" aria-label="Nuestros cuatro meses">
        {meses.map((mes, i) => (
          <Reveal key={mes.numero} delay={i * 80}>
            <article className="cm-mes">
              <span className="cm-mes__numero eyebrow">
                {mes.numero} · {mes.rango}
              </span>
              <h2 className="cm-mes__titulo">{mes.titulo}</h2>
              <p className="cm-mes__texto">{mes.texto}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <Reveal>
        <section className="cm-carta">
          <div className="cm-carta__sello">
            <Seal size={44} initials="♥" />
          </div>
          <h2 className="cm-carta__titulo">{carta.titulo}</h2>
          {carta.parrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="cm-carta__firma">{carta.firma}</p>
        </section>
      </Reveal>

      <Reveal>
        <section className="cm-proximo">
          <span className="eyebrow">{proximoCapitulo.eyebrow}</span>
          <h2 className="cm-proximo__titulo">{proximoCapitulo.titulo}</h2>
          <p>{proximoCapitulo.texto}</p>
        </section>
      </Reveal>
    </div>
  );
}

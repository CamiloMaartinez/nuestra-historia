# Guía de mantenimiento

Cosas comunes que vas a querer cambiar con el tiempo, y exactamente dónde hacerlo.

## Cambiar la fecha de inicio del contador

Archivo: `src/config.js`

```js
export const FECHA_INICIO = "2026-01-03T00:00:00";
```

## Agregar un nuevo momento a la línea de tiempo ("Nuestra Historia")

1. Archivo `src/data/historia.js` → agrega un objeto nuevo al arreglo:

```js
{
  id: 8,
  fecha: '2026-08-20',
  tituloKey: 'story.events.nuevoEvento.title',
  descKey: 'story.events.nuevoEvento.desc',
},
```

2. Agrega la traducción correspondiente en `src/i18n/es.json` y `src/i18n/en.json`, dentro de `story.events`:

```json
"nuevoEvento": {
  "title": "Título del momento",
  "desc": "Descripción breve."
}
```

## Agregar una nueva fecha recurrente (cumpleaños, aniversario, etc.)

1. Archivo `src/data/fechas.js` → agrega un objeto (mes y día, sin año, porque se repite cada año):

```js
{ id: 5, mes: 12, dia: 25, labelKey: 'dates.items.nuevaFecha', icono: '🎄' },
```

2. Agrega la traducción en `dates.items` dentro de ambos archivos de `i18n`.

## Cambiar las iniciales del sello (logo)

Archivo: `src/components/Navbar.jsx` → busca `<Seal size={36} initials="C&L" />` y cambia el texto.

## Cambiar los colores del sitio

Archivo: `src/styles/tokens.css` → todas las variables `--color-...` (modo claro arriba, modo oscuro dentro de `[data-theme="dark"]`).

## Agregar un tercer idioma

1. Crea `src/i18n/[codigo].json` (ej. `fr.json`) copiando la estructura de `es.json` y traduciendo cada valor.
2. Regístralo en `src/i18n/config.js`, dentro de `resources`.
3. Agrega un botón más en el selector de idioma en `src/components/Navbar.jsx`.

## Cambiar la frase final (propuesta) o el subtítulo del Home

Archivo `src/i18n/es.json` y `src/i18n/en.json`, dentro de `home.proposal` y `home.subtitle`.

## Restablecer contraseña de administrador

Supabase → Authentication → Users → selecciona el usuario → opción para restablecer contraseña.

## Ver o borrar contenido directamente (sin pasar por el sitio)

Supabase → Table Editor → tablas `fotos`, `cartas`, `recuerdos`. Ahí puedes editar o borrar filas manualmente si algo se subió mal.

## Pendiente / ideas futuras (no bloquean el uso actual)

- Optimización de imágenes antes de subir (actualmente se suben en su tamaño original).
- Revisión de accesibilidad y SEO (Fase 12 del proyecto, pausada).
- Videos, audios, mapas, calendario, comentarios, favoritos (arquitectura ya preparada para agregarlos sin romper nada existente).

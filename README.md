# Nuestra Historia 💌

Espacio digital privado para guardar y revivir recuerdos de nuestra relación: fotos, cartas, momentos importantes y fechas especiales.

🔗 **Sitio publicado:** https://camilomaartinez.github.io/nuestra-historia/

## Stack técnico

- **Frontend:** React + Vite
- **Backend:** Supabase (base de datos Postgres, Storage de archivos, Autenticación)
- **Publicación:** GitHub Pages
- **Idiomas:** Español / Inglés (react-i18next)

## Estructura del proyecto

src/
├── components/ # Piezas reutilizables (Navbar, Seal, Contador, Reveal, etc.)
├── pages/ # Cada sección del sitio (Home, Fotos, Cartas, Recuerdos, Fechas, Historia, Login)
├── services/ # Comunicación con Supabase (fotos, cartas, recuerdos, auth)
├── context/ # Estado global de autenticación
├── hooks/ # Lógica reutilizable (contador, próximas fechas)
├── i18n/ # Diccionarios de traducción (es.json, en.json)
├── data/ # Contenido editable: línea de tiempo y fechas importantes
└── config.js # Fecha de inicio de la relación

## Cómo correr el proyecto localmente

1. `npm install`
2. Crear un archivo `.env` en la raíz (ver `.env.example`) con las claves de Supabase.
3. `npm run dev`
4. Abrir `http://localhost:5173/`

## Cómo publicar cambios nuevos

Cada vez que edites código y quieras que se vea en el sitio publicado:

```bash
git add .
git commit -m "Descripción breve del cambio"
git push
npm run deploy
```

> **Nota:** subir contenido (fotos, cartas, recuerdos) desde los formularios del sitio **no** requiere hacer esto — ese contenido vive en Supabase y aparece automáticamente en cualquier dispositivo, sin publicar nada de nuevo.

## Cómo administrar contenido

Inicia sesión desde el botón "Administrar" en el navbar, usando el usuario creado en Supabase (Authentication → Users). Solo con sesión iniciada aparecen los formularios para subir fotos, escribir cartas y agregar recuerdos.

## Ver la guía de mantenimiento

Para saber cómo cambiar fechas, colores, textos, o agregar nuevos idiomas, revisa `MANTENIMIENTO.md`.

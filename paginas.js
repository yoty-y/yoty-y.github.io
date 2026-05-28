// paginas.js
// ─────────────────────────────────────────────────────────────────────────────
// Registro de páginas del sitio.
// Este archivo es la ÚNICA fuente de verdad para añadir, quitar u ordenar páginas.
//
// Campos por página:
//   id       → clave única usada en toda la app (localStorage, eventos, rutas)
//   titulo   → texto visible en el sidebar
//   icono    → emoji o carácter del botón del sidebar
//   archivo  → nombre del módulo dentro de paginas/  (p.ej. "inicio.js")
//   hijos    → (opcional) array de páginas hijo — crea un acordeón desplegable en el sidebar
//   sidebar  → (opcional) false para ocultar del sidebar pero mantener la página navegable
// ─────────────────────────────────────────────────────────────────────────────

export const paginas = [
    {
        id: "inicio",
        titulo: "Inicio Principal",
        icono: "🏠",
        archivo: "inicio.js",
        hijos: [
            { id: "explorador", titulo: "Explorador", icono: "🔭", archivo: "explorador.js" }
        ]
    },
    {
        id: "texto-uno",
        titulo: "Texto Uno (Demo)",
        icono: "📄",
        archivo: "texto-uno.js"
    },
    {
        id: "minima",
        titulo: "Página Mínima",
        icono: "🧱",
        archivo: "minima.js"
    },
    {
        id: "secreto",
        titulo: "Página Secreta",
        icono: "🔒",
        archivo: "secreto.js",
        sidebar: false          // existe y se puede navegar, pero el sidebar la omite
    }
];
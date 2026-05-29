// paginas.js — Registro de páginas
// ─────────────────────────────────────────────────────────────────────────────
// CAMPOS:
//   id      : string único sin espacios (clave en localStorage y eventos)
//   titulo  : texto visible en el sidebar
//   icono   : emoji o carácter
//   ruta    : ruta relativa desde la raíz → "paginas/inicio.js"
//             Soporta subcarpetas: "paginas/seccion/pagina.js"
//   hijos   : (opcional) array de páginas hijo → acordeón en sidebar
//   sidebar : (opcional) false → existe pero no aparece en el sidebar
// ─────────────────────────────────────────────────────────────────────────────

export const paginas = [
    {
        id: "inicio", titulo: "Inicio Principal", icono: "🏠", ruta: "paginas/inicio.js",
        hijos: [
            { id: "explorador", titulo: "Explorador", icono: "🔭", ruta: "paginas/explorador.js" }
        ]
    },
    { id: "texto-uno", titulo: "Texto Uno (Demo)", icono: "📄", ruta: "paginas/texto-uno.js" },
    { id: "minima",    titulo: "Página Mínima",    icono: "🧱", ruta: "paginas/minima.js" },
    { id: "secreto",   titulo: "Página Secreta",   icono: "🔒", ruta: "paginas/secreto.js", sidebar: false }
];
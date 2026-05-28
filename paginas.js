// paginas.js
// ─────────────────────────────────────────────────────────────────────────────
// Registro de páginas del sitio.
// ÚNICA fuente de verdad para añadir, quitar, ordenar y ubicar páginas.
//
// Campos por página:
//   id      → clave única (localStorage, eventos, sidebar)
//   titulo  → texto visible en el sidebar
//   icono   → emoji o carácter del botón del sidebar
//   ruta    → ruta relativa desde la raíz del proyecto hasta el módulo JS.
//             Ejemplos:
//               "paginas/inicio.js"             ← archivo plano (como antes)
//               "paginas/cosmos/inicio.js"       ← subcarpeta temática
//               "paginas/admin/panel/ajustes.js" ← anidado sin límite
//             core.js usa esta ruta tal cual, sin agregar ningún prefijo.
//   hijos   → (opcional) array de páginas hijo → acordeón desplegable en sidebar
//   sidebar → (opcional) false oculta del sidebar pero la página sigue siendo navegable
// ─────────────────────────────────────────────────────────────────────────────

export const paginas = [
    {
        id: "inicio",
        titulo: "Inicio Principal",
        icono: "🏠",
        ruta: "paginas/inicio.js",
        hijos: [
            {
                id: "explorador",
                titulo: "Explorador",
                icono: "🔭",
                ruta: "paginas/explorador.js"
            }
        ]
    },
    {
        id: "texto-uno",
        titulo: "Texto Uno (Demo)",
        icono: "📄",
        ruta: "paginas/texto-uno.js"
    },
    {
        id: "minima",
        titulo: "Página Mínima",
        icono: "🧱",
        ruta: "paginas/minima.js"
    },
    {
        id: "secreto",
        titulo: "Página Secreta",
        icono: "🔒",
        ruta: "paginas/secreto.js",
        sidebar: false
    }
];

// ─── Ejemplo de estructura con subcarpetas ────────────────────────────────────
// Cuando quieras organizar en subcarpetas, solo cambia el campo ruta.
// El resto del sistema (sidebar, navegación, temas) no se toca.
//
// {
//     id: "cosmos",
//     titulo: "El Cosmos",
//     icono: "🌌",
//     ruta: "paginas/cosmos/index.js",       ← subcarpeta
//     hijos: [
//         { id: "estrellas", titulo: "Estrellas", icono: "⭐", ruta: "paginas/cosmos/estrellas.js" },
//         { id: "galaxias",  titulo: "Galaxias",  icono: "🌀", ruta: "paginas/cosmos/galaxias.js"  }
//     ]
// }
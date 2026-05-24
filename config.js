// config.js
export const configSitio = {
    // ─── Páginas registradas ───────────────────────────────────────────────────
    paginas: [
        { id: "inicio",    titulo: "Inicio Principal",  icono: "🏠", archivo: "inicio.js"    },
        { id: "texto-uno", titulo: "Texto Uno (Demo)",  icono: "📄", archivo: "texto-uno.js" }
    ],

    // ─── Los 3 temas básicos del botón izquierdo (ciclo) ─────────────────────
    temasBasicos: [
        { id: "auto",  nombre: "Automático", icono: "A",  color: "#a1a1aa", borde: false },
        { id: "light", nombre: "Claro",      icono: "☼", color: "#ffffff", borde: true  },
        { id: "dark",  nombre: "Oscuro",     icono: "☽", color: "#1e1e1e", borde: false }
    ],

    // ─── Categorías de temas en carpetas ─────────────────────────────────────
    categoriasTemas: [
        {
            nombre: "🌡️ TONOS CÁLIDOS",
            temas: [
                { id: "retro",    nombre: "Retro Rosado",    color: "#bc4749", icono: "🌸" },
                { id: "desierto", nombre: "Desierto Arena",  color: "#b4846c", icono: "🏜️" },
                { id: "amanecer", nombre: "Amanecer Suave",  color: "#e07b54", icono: "🌅" },
                { id: "cafe",     nombre: "Café Oscuro",     color: "#6f4e37", icono: "☕" },
                { id: "brasa",    nombre: "Brasa Naranja",   color: "#ff4d00", icono: "🔥" }
            ]
        },
        {
            nombre: "🧊 TONOS FRÍOS",
            temas: [
                { id: "oceano",   nombre: "Océano Profundo", color: "#06b6d4", icono: "🌊" },
                { id: "artico",   nombre: "Ártico Azul",     color: "#3f72af", icono: "❄️" },
                { id: "aurora",   nombre: "Aurora Boreal",   color: "#a855f7", icono: "🌌" },
                { id: "niebla",   nombre: "Niebla Gris",     color: "#94a3b8", icono: "🌫️" },
                { id: "hielo",    nombre: "Cristal de Hielo",color: "#7dd3fc", icono: "💎" }
            ]
        },
        {
            nombre: "🌿 NATURALEZA",
            temas: [
                { id: "bosque",   nombre: "Bosque Verde",    color: "#6dbf85", icono: "🌲" },
                { id: "musgo",    nombre: "Musgo Oscuro",    color: "#4a7c59", icono: "🌿" },
                { id: "lavanda",  nombre: "Campo Lavanda",   color: "#9d85c7", icono: "💜" },
                { id: "oliva",    nombre: "Oliva Toscana",   color: "#8a9a5b", icono: "🫒" },
                { id: "tierra",   nombre: "Tierra Profunda", color: "#5c4033", icono: "🪨" }
            ]
        },
        {
            nombre: "🎨 MODERNOS",
            temas: [
                { id: "minimal",  nombre: "Minimal Blanco",  color: "#f1f5f9", icono: "◻️", borde: true },
                { id: "carbon",   nombre: "Carbón Slate",    color: "#334155", icono: "🪨" },
                { id: "tinta",    nombre: "Tinta Sepia",     color: "#3d2b1f", icono: "✒️" },
                { id: "grafito",  nombre: "Grafito Puro",    color: "#475569", icono: "📐" },
                { id: "rosado",   nombre: "Rosa Moderno",    color: "#f472b6", icono: "🌷" }
            ]
        },
        {
            nombre: "⚡ NEÓN & ESPECIALES",
            temas: [
                { id: "cyberpunk",nombre: "Cyberpunk",       color: "#ff007f", icono: "⚡" },
                { id: "rgb",      nombre: "Espectro RGB",    color: "#00ff66", icono: "🎮" },
                { id: "matrix",   nombre: "Matrix Verde",    color: "#00ff41", icono: "💻" },
                { id: "synthwave",nombre: "Synthwave",       color: "#e040fb", icono: "🎹" },
                { id: "neon-oro", nombre: "Neón Dorado",     color: "#ffd700", icono: "✨" }
            ]
        }
    ]
};
// config.js
export const configSitio = {
    // Registro de sub-páginas
    paginas: [
        { id: "inicio", titulo: "Inicio Principal", icono: "🏠", archivo: "inicio.js" },
        { id: "texto-uno", titulo: "Texto Uno (Demo)", icono: "📄", archivo: "texto-uno.js" }
    ],

    // Registro de Temas
    categoriasTemas: [
        {
            nombre: "🌈 BÁSICOS",
            temas: [
                { id: "auto", nombre: "Automático", color: "#a1a1aa", icono: "A" },
                { id: "light", nombre: "Claro", color: "#ffffff", icono: "☼" },
                { id: "dark", nombre: "Oscuro", color: "#1e1e1e", icono: "☽" }
            ]
        },
        {
            nombre: "⚡ MULTICOLOR & NEÓN",
            temas: [
                { id: "cyberpunk", nombre: "Cyberpunk", color: "#ff007f", icono: "⚡" },
                { id: "rgb", nombre: "Espectro RGB", color: "#00ff66", icono: "🎮" }
            ]
        }
    ]
};
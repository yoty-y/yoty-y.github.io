export const configSitio = {
    // 1. REGISTRO DE TEMAS (Organizados por carpetas/categorías)
    categoriasTemas: [
        {
            nombre: "🌈 MULTICOLOR & NEÓN",
            temas: [
                { id: "cyberpunk", nombre: "⚡ Cyberpunk", clase: "tema-cyberpunk", color: "#ff007f", icono: "⚡" },
                { id: "rgb", nombre: "🎮 Espectro RGB", clase: "tema-rgb", color: "#00ff66", icono: "🎮" },
                { id: "fuego", nombre: "🔥 Fuego Neón", clase: "tema-fuego", color: "#ff4d00", icono: "🔥" }
            ]
        },
        {
            nombre: "🌿 TONOS ORGÁNICOS",
            temas: [
                { id: "bosque", nombre: "🌲 Bosque Místico", clase: "tema-bosque", color: "#2a3d32", icono: "🌲" },
                { id: "retro", nombre: "🌸 Aki-Retro", clase: "tema-retro", color: "#bc4749", icono: "🌸" },
                { id: "desierto", nombre: "🏜️ Desierto Cálido", clase: "tema-desierto", color: "#7d5a50", icono: "🏜️" }
            ]
        },
        {
            nombre: "🌊 TONOS FRÍOS",
            temas: [
                { id: "oceano", nombre: "🌊 Océano Profundo", clase: "tema-oceano", color: "#06b6d4", icono: "🌊" },
                { id: "artico", nombre: "❄️ Ártico Minimal", clase: "tema-artico", color: "#3f72af", icono: "❄️" },
                { id: "aurora", nombre: "🌌 Noche Aurora", clase: "tema-aurora", color: "#a855f7", icono: "🌌" }
            ]
        }
    ],
    // 2. REGISTRO DE PÁGINAS (Lo que sale en la barra lateral)
    paginas: [
        { id: "inicio", titulo: "Inicio Principal", icono: "A", archivo: "inicio.js" },
        { id: "texto-uno", titulo: "Texto Uno", icono: "B", archivo: "texto-uno.js" },
        { id: "texto-dos", titulo: "Texto Dos", icono: "C", archivo: "texto-dos.js" }
    ]
};
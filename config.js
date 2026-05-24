export const configSitio = {
    paginas: [
        { id: "inicio", titulo: "Inicio", archivo: "inicio.js", icono: "🏠", visible: 1, padre: null },
        { id: "progreso", titulo: "Mi Progreso", archivo: "progreso.js", icono: "📈", visible: 1, padre: "inicio" },
        { id: "metricas", titulo: "Métricas", archivo: "metricas.js", icono: "📊", visible: 1, padre: "progreso" },
        
        { id: "programas", titulo: "Programas", archivo: "programas.js", icono: "💻", visible: 1, padre: null },
        
        { id: "texto-uno", titulo: "Texto Uno", archivo: "texto-uno.js", icono: "📄", visible: 1, padre: null }
    ],

    categoriasTemas: [
        {
            nombre: "🌈 MULTICOLOR & NEÓN",
            temas: [
                { id: "cyberpunk", nombre: "⚡ Cyberpunk", icono: "⚡" },
                { id: "rgb", nombre: "🎮 Espectro RGB", icono: "🎮" }
            ]
        },
        {
            nombre: "🌊 TONOS FRÍOS",
            temas: [
                { id: "oceano", nombre: "🌊 Océano Profundo", icono: "🌊" },
                { id: "dark", nombre: "🌑 Oscuro Puro", icono: "🌑" }
            ]
        }
    ]
};
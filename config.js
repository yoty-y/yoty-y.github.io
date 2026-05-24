export const configSitio = {
    // visible: 1 (Menú) | 0 (Oculto)
    // padre: id del superior | null (Raíz)
    paginas: [
        { id: "inicio", titulo: "Inicio Principal", archivo: "inicio.js", icono: "🏠", visible: 1, padre: null },
        
            // Subnivel 1
            { id: "sub-inicio-progreso", titulo: "Mi Progreso", archivo: "progreso.js", icono: "📈", visible: 1, padre: "inicio" },
                
                // Subnivel 2
                { id: "sub-inicio-detalles", titulo: "Métricas", archivo: "metricas.js", icono: "📊", visible: 1, padre: "sub-inicio-progreso" },
            
            // Página oculta
            { id: "pagina-prueba-hijo", titulo: "Prueba Oculta", archivo: "sub-inicio.js", icono: "🧪", visible: 0, padre: "inicio" },

        { id: "texto-uno", titulo: "Texto Uno", archivo: "texto-uno.js", icono: "📄", visible: 1, padre: null },
        { id: "texto-dos", titulo: "Texto Dos", archivo: "texto-dos.js", icono: "📄", visible: 1, padre: null }
    ],

    categoriasTemas: [
        {
            nombre: "🌈 MULTICOLOR & NEÓN",
            temas: [
                { id: "cyberpunk", nombre: "⚡ Cyberpunk", color: "#ff007f", icono: "⚡" },
                { id: "rgb", nombre: "🎮 Espectro RGB", color: "#00ff66", icono: "🎮" },
                { id: "fuego", nombre: "🔥 Fuego Neón", color: "#ff4d00", icono: "🔥" }
            ]
        },
        {
            nombre: "🌿 TONOS ORGÁNICOS",
            temas: [
                { id: "bosque", nombre: "🌲 Bosque Místico", color: "#2a3d32", icono: "🌲" },
                { id: "retro", nombre: "🌸 Aki-Retro", color: "#bc4749", icono: "🌸" },
                { id: "desierto", nombre: "🏜️ Desierto Cálido", color: "#7d5a50", icono: "🏜️" }
            ]
        },
        {
            nombre: "🌊 TONOS FRÍOS",
            temas: [
                { id: "oceano", nombre: "🌊 Océano Profundo", color: "#06b6d4", icono: "🌊" },
                { id: "artico", nombre: "❄️ Ártico Minimal", color: "#3f72af", icono: "❄️" },
                { id: "aurora", nombre: "🌌 Noche Aurora", color: "#a855f7", icono: "🌌" }
            ]
        }
    ]
};
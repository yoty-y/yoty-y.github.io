export const configSitio = {
    // 1. REGISTRO DE PÁGINAS Y JERARQUÍA MULTI-NIVEL
    // visible: 1 (Aparece en menú) | visible: 0 (Oculto en menú, pero accesible por enlace)
    // padre: "id-del-padre" (Crea un subnivel) | padre: null (Página principal)
    paginas: [
        { id: "inicio", titulo: "Inicio Principal", archivo: "inicio.js", icono: "🏠", visible: 1, padre: null },
        
            // --- SUBPÁGINAS DE INICIO ---
            { id: "sub-inicio-progreso", titulo: "Mi Progreso", archivo: "sub-inicio-progreso.js", icono: "📈", visible: 1, padre: "inicio" },
                
                // Nivel 2 (Sub-subpágina)
                { id: "sub-inicio-detalles", titulo: "Métricas", archivo: "sub-inicio-detalles.js", icono: "📊", visible: 1, padre: "sub-inicio-progreso" },
            
            // Página de prueba oculta en el menú (visible: 0) pero enlazable desde inicio.js
            { id: "pagina-prueba-hijo", titulo: "Prueba Oculta", archivo: "sub-inicio.js", icono: "🧪", visible: 0, padre: "inicio" },

        // --- OTRAS PÁGINAS PRINCIPALES ---
        { id: "texto-uno", titulo: "Texto Uno", archivo: "texto-uno.js", icono: "📄", visible: 1, padre: null },
        { id: "texto-dos", titulo: "Texto Dos", archivo: "texto-dos.js", icono: "📄", visible: 1, padre: null }
    ],

    // 2. REGISTRO DE TEMAS (Metadata para el menú, NO los estilos reales)
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
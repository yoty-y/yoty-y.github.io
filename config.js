export const configSitio = {
    paginas: [
        { id: "inicio", titulo: "Inicio", archivo: "inicio.js", icono: "🏠", visible: 1, padre: null },
        { id: "progreso", titulo: "Mi Progreso", archivo: "progreso.js", icono: "📈", visible: 1, padre: "inicio" },
        { id: "metricas", titulo: "Métricas", archivo: "metricas.js", icono: "📊", visible: 1, padre: "progreso" },
        { id: "texto-uno", titulo: "Texto Uno", archivo: "texto-uno.js", icono: "📄", visible: 1, padre: null },
        { id: "texto-dos", titulo: "Texto Dos", archivo: "texto-dos.js", icono: "📄", visible: 1, padre: null }
    ],
    categoriasTemas: [
        {
            nombre: "ESTILOS",
            temas: [
                { id: "light", nombre: "Claro", icono: "☼" },
                { id: "dark", nombre: "Oscuro", icono: "☽" },
                { id: "cyberpunk", nombre: "Cyberpunk", icono: "⚡" }
            ]
        }
    ]
};
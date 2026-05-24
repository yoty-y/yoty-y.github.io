export const contenido = {
    detallada: `
        <h3 class="titulo-contenido">Página Secreta / Oculta</h3>
        <div class="bloque-lectura">
            <h4>🧪 Navegación Exitosa</h4>
            <div class="txt-detallado">
                Llegaste aquí usando un enlace directo (window.cargarPagina). Como en config.js esta página tiene "visible: 0", no la verás ensuciando la barra lateral.
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
            <button onclick="window.cargarPagina('inicio')" class="btn-interactivo" style="width: auto; padding: 0 15px;">
                <span>⬅ Volver al Inicio</span>
            </button>
        </div>
    `,
    resumida: `
        <h3 class="titulo-contenido">Página Oculta</h3>
        <div class="bloque-lectura">
            <h4>🧪 Éxito</h4>
            <div class="txt-resumido">Navegaste fuera de la barra lateral correctamente.</div>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
            <button onclick="window.cargarPagina('inicio')" class="btn-interactivo" style="width: auto; padding: 0 15px;">
                <span>⬅ Volver</span>
            </button>
        </div>
    `
};
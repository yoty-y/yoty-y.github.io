export const contenido = {
    detallada: `
        <h3 class="titulo-contenido">Contenido Dinámico Adaptable</h3>
        <p style="text-align: center; font-size: 0.9rem; color: var(--texto-secundario); margin-bottom: 20px;">
            Estás en la página de INICIO.
        </p>

        <div class="bloque-lectura">
            <h4>🚀 Arquitectura SPA</h4>
            <div class="txt-detallado">
                Aquí comprobamos que la arquitectura dinámica funciona a la perfección.
            </div>
        </div>

        <div style="margin-top: 30px; text-align: center;">
            <p style="font-size: 0.9rem; margin-bottom: 15px;">Este botón lleva a una página que existe en config.js pero no está en la barra lateral:</p>
            <button onclick="window.cargarPagina('pagina-prueba-hijo')" class="btn-interactivo" style="width: auto; padding: 0 15px;">
                <span>Ir a Página Oculta ➔</span>
            </button>
        </div>
    `,
    resumida: `
        <h3 class="titulo-contenido">Inicio (Resumen)</h3>
        <div class="bloque-lectura">
            <h4>🚀 SPA Funcional</h4>
            <div class="txt-resumido">
                La web funciona sin recargas.
            </div>
        </div>
        <div style="margin-top: 20px; text-align: center;">
            <button onclick="window.cargarPagina('pagina-prueba-hijo')" class="btn-interactivo" style="width: auto; padding: 0 15px;">
                <span>Ir a Oculta ➔</span>
            </button>
        </div>
    `
};
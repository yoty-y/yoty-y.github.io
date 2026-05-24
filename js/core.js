// js/core.js
import { configSitio } from '../config.js';

window.modoLecturaActual = localStorage.getItem('modo-lectura-guardado') || 'detallada';
let paginaActualId = localStorage.getItem('pagina-actual') || configSitio.paginas[0].id;
let moduloPaginaActual = null;

export const EstadoGlobal = {
    // --- NAVEGACIÓN SPA ---
    async cargarPagina(idPagina) {
        const paginaConfig = configSitio.paginas.find(p => p.id === idPagina) || configSitio.paginas[0];
        paginaActualId = paginaConfig.id;
        localStorage.setItem('pagina-actual', paginaActualId);
        
        try {
            moduloPaginaActual = await import(`../paginas/${paginaConfig.archivo}`);
            this.renderizarContenidoActivo();
            window.dispatchEvent(new CustomEvent('paginaCambiada', { detail: idPagina }));
        } catch (error) {
            document.getElementById('contenedor-central').innerHTML = `<h3>Error cargando: ${paginaConfig.titulo}</h3>`;
        }
    },

    renderizarContenidoActivo() {
        if (!moduloPaginaActual) return;
        const contenedor = document.getElementById('contenedor-central');
        
        // Soporta exportar un Objeto {detallada, resumida} o un String de HTML directo
        if (typeof moduloPaginaActual.contenido === 'string') {
            contenedor.innerHTML = moduloPaginaActual.contenido;
        } else {
            contenedor.innerHTML = moduloPaginaActual.contenido[window.modoLecturaActual];
        }
    },

    // --- TEMAS Y LECTURA ---
    aplicarTema(idTema) {
        localStorage.setItem('tema-guardado', idTema);
        document.body.className = document.body.className.replace(/modo-oscuro|tema-\w+/g, '').trim();
        
        if (idTema === 'dark' || (idTema === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('modo-oscuro');
        } else if (idTema !== 'light' && idTema !== 'auto') {
            document.body.classList.add(`tema-${idTema}`);
        }
        window.dispatchEvent(new CustomEvent('temaCambiado', { detail: idTema }));
    },

    aplicarModoLectura(modo) {
        window.modoLecturaActual = modo;
        localStorage.setItem('modo-lectura-guardado', modo);
        
        document.body.classList.remove('lectura-detallada', 'lectura-resumida');
        document.body.classList.add(`lectura-${modo}`);
        
        // Notifica a los web components (<texto-dinamico>) y al sistema
        window.dispatchEvent(new CustomEvent('modoLecturaCambiado', { detail: modo }));
        
        // Si la página usa un objeto {detallada, resumida}, lo re-renderiza
        if (moduloPaginaActual && typeof moduloPaginaActual.contenido === 'object') {
            this.renderizarContenidoActivo();
        }
    },

    restablecer() {
        this.aplicarTema('auto');
        this.aplicarModoLectura('detallada');
        this.cargarPagina(configSitio.paginas[0].id);
    }
};
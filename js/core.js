// js/core.js
import { configSitio } from '../config.js';

// ─── Estado global expuesto en window para que los web components lo lean ────
window.modoLecturaActual = localStorage.getItem('modo-lectura-guardado') || 'detallada';

let _paginaActualId    = localStorage.getItem('pagina-actual') || configSitio.paginas[0].id;
let _moduloPaginaActual = null;

// ─── Búsqueda recursiva en el árbol de páginas ───────────────────────────────
function _buscarPagina(paginas, id) {
    for (const p of paginas) {
        if (p.id === id) return p;
        if (Array.isArray(p.hijos)) {
            const found = _buscarPagina(p.hijos, id);
            if (found) return found;
        }
    }
    return null;
}

// ─── EstadoGlobal ─────────────────────────────────────────────────────────────
export const EstadoGlobal = {

    get paginaActualId() { return _paginaActualId; },

    // ── Navegación SPA ────────────────────────────────────────────────────────
    async cargarPagina(idPagina) {
        const cfg = _buscarPagina(configSitio.paginas, idPagina) || configSitio.paginas[0];
        _paginaActualId = cfg.id;
        localStorage.setItem('pagina-actual', _paginaActualId);

        try {
            _moduloPaginaActual = await import(`../paginas/${cfg.archivo}`);
            this.renderizarContenidoActivo();
            window.dispatchEvent(new CustomEvent('paginaCambiada', { detail: _paginaActualId }));
        } catch (err) {
            document.getElementById('contenedor-central').innerHTML =
                `<p style="color:var(--texto-secundario);padding:24px;">Error cargando: <strong>${cfg.titulo}</strong></p>`;
            console.error(err);
        }
    },

    renderizarContenidoActivo() {
        if (!_moduloPaginaActual) return;
        const contenedor = document.getElementById('contenedor-central');
        contenedor.innerHTML = typeof _moduloPaginaActual.contenido === 'string'
            ? _moduloPaginaActual.contenido
            : (_moduloPaginaActual.contenido[window.modoLecturaActual] || '');

        if (typeof _moduloPaginaActual.inicializar === 'function') {
            _moduloPaginaActual.inicializar();
        }
    },

    // ── Temas ─────────────────────────────────────────────────────────────────
    aplicarTema(idTema) {
        localStorage.setItem('tema-guardado', idTema);

        // Limpia clases de tema anteriores
        document.body.className = document.body.className
            .replace(/\bmodo-oscuro\b|\btema-[\w-]+\b/g, '')
            .trim();

        const esDark = idTema === 'dark' ||
            (idTema === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (esDark) {
            document.body.classList.add('modo-oscuro');
        } else if (idTema !== 'light' && idTema !== 'auto') {
            document.body.classList.add(`tema-${idTema}`);
        }

        window.dispatchEvent(new CustomEvent('temaCambiado', { detail: idTema }));
    },

    // ── Modo lectura ──────────────────────────────────────────────────────────
    aplicarModoLectura(modo) {
        window.modoLecturaActual = modo;
        localStorage.setItem('modo-lectura-guardado', modo);

        document.body.classList.remove('lectura-detallada', 'lectura-resumida');
        document.body.classList.add(`lectura-${modo}`);

        window.dispatchEvent(new CustomEvent('modoLecturaCambiado', { detail: modo }));

        // Re-renderiza solo si la página usa el objeto {detallada, resumida}
        if (_moduloPaginaActual && typeof _moduloPaginaActual.contenido === 'object') {
            this.renderizarContenidoActivo();
        }
    },

    // ── Restablecer ───────────────────────────────────────────────────────────
    restablecer() {
        this.aplicarTema('auto');
        this.aplicarModoLectura('detallada');
        this.cargarPagina(configSitio.paginas[0].id);
    }
};
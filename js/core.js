// js/core.js
import { configSitio }          from '../config.js';
import { inyectarCSS }          from './temas-engine.js';

// ─── Estado global expuesto en window para que los web components lo lean ────
window.modoLecturaActual = localStorage.getItem('modo-lectura-guardado') || 'detallada';

let _paginaActualId     = localStorage.getItem('pagina-actual') || configSitio.paginas[0].id;
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

// ─── Busca el objeto tema en temasBasicos + todas las categorías ─────────────
function _buscarTema(idTema) {
    const basico = configSitio.temasBasicos.find(t => t.id === idTema);
    if (basico) return basico;
    for (const cat of configSitio.categoriasTemas) {
        const encontrado = (cat.temas || []).find(t => t.id === idTema);
        if (encontrado) return encontrado;
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
            _moduloPaginaActual = await import(`../${cfg.ruta}`);
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

        // Inyectar CSS del tema (null = tema básico, usa estilos.css)
        const tema = _buscarTema(idTema);
        inyectarCSS(tema?.css ?? null);

        window.dispatchEvent(new CustomEvent('temaCambiado', { detail: idTema }));
    },

    // ── Modo lectura ──────────────────────────────────────────────────────────
    aplicarModoLectura(modo) {
        window.modoLecturaActual = modo;
        localStorage.setItem('modo-lectura-guardado', modo);

        document.body.classList.remove('lectura-detallada', 'lectura-resumida');
        document.body.classList.add(`lectura-${modo}`);

        window.dispatchEvent(new CustomEvent('modoLecturaCambiado', { detail: modo }));

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
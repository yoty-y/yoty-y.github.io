// js/core.js — SPA: navegación, temas, modo lectura
import { paginas }                    from '../paginas.js';
import { temasBasicos, categoriasTemas } from '../temas.js';

window.modoLecturaActual = localStorage.getItem('modo-lectura-guardado') || 'detallada';

let _paginaActual  = null;
let _moduloActual  = null;
const _config      = { paginas, temasBasicos, categoriasTemas };

// ── Búsqueda recursiva ────────────────────────────────────────────────────────
function _buscar(lista, id) {
    for (const p of lista) {
        if (p.id === id) return p;
        if (p.hijos) { const h = _buscar(p.hijos, id); if (h) return h; }
    }
    return null;
}

// ── Inyección CSS del tema activo ─────────────────────────────────────────────
function _inyectarCSS(css) {
    let tag = document.getElementById('tema-activo');
    if (!tag) { tag = document.createElement('style'); tag.id = 'tema-activo'; document.head.appendChild(tag); }
    tag.textContent = css || '';
}

// ── Busca el objeto tema en basicos + categorías ──────────────────────────────
function _buscarTema(id) {
    return temasBasicos.find(t => t.id === id)
        || categoriasTemas.flatMap(c => c.temas).find(t => t.id === id)
        || null;
}

// ── EstadoGlobal ──────────────────────────────────────────────────────────────
export const EstadoGlobal = {

    get config() { return _config; },
    get paginaActualId() { return _paginaActual?.id || paginas[0].id; },

    // Navegación SPA
    async cargarPagina(id) {
        const cfg = _buscar(paginas, id) || paginas[0];
        _paginaActual = cfg;
        localStorage.setItem('pagina-actual', cfg.id);
        try {
            _moduloActual = await import(`../${cfg.ruta}`);
            this._renderizar();
            window.dispatchEvent(new CustomEvent('paginaCambiada', { detail: cfg.id }));
        } catch (err) {
            document.getElementById('contenedor-central').innerHTML =
                `<p style="color:var(--texto-secundario);padding:24px">Error cargando: <strong>${cfg.titulo}</strong></p>`;
            console.error(err);
        }
    },

    _renderizar() {
        if (!_moduloActual) return;
        const el = document.getElementById('contenedor-central');
        el.innerHTML = typeof _moduloActual.contenido === 'string'
            ? _moduloActual.contenido
            : (_moduloActual.contenido[window.modoLecturaActual] || '');
        if (typeof _moduloActual.inicializar === 'function') _moduloActual.inicializar();
    },

    // Temas
    aplicarTema(id) {
        localStorage.setItem('tema-guardado', id);
        document.body.className = document.body.className
            .replace(/\bmodo-oscuro\b|\btema-[\w-]+\b/g, '').trim();

        const esDark = id === 'dark' || (id === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (esDark)                             document.body.classList.add('modo-oscuro');
        else if (id !== 'light' && id !== 'auto') document.body.classList.add(`tema-${id}`);

        _inyectarCSS(_buscarTema(id)?.css ?? null);
        window.dispatchEvent(new CustomEvent('temaCambiado', { detail: id }));
    },

    // Modo lectura
    aplicarModoLectura(modo) {
        window.modoLecturaActual = modo;
        localStorage.setItem('modo-lectura-guardado', modo);
        document.body.classList.remove('lectura-detallada', 'lectura-resumida');
        document.body.classList.add(`lectura-${modo}`);
        window.dispatchEvent(new CustomEvent('modoLecturaCambiado', { detail: modo }));
        if (_moduloActual && typeof _moduloActual.contenido === 'object') this._renderizar();
    },

    // Restablecer
    restablecer() {
        this.aplicarTema('auto');
        this.aplicarModoLectura('detallada');
        this.cargarPagina(paginas[0].id);
    }
};
// js/core.js
import { paginas }                      from '../paginas.js';
import { temasBasicos, categoriasTemas, getCategoriaSecretos } from '../temas.js';

// ── Estado global ─────────────────────────────────────────────────────────────
window.modoLecturaActual = localStorage.getItem('modo-lectura-guardado') || 'detallada';

let _paginaActual = null;
let _modulo       = null;

// config usa getter para recalcular categoriasTemas cada vez que se lea,
// así los secretos desbloqueados aparecen sin recargar la página
export const config = {
    paginas,
    temasBasicos,
    get categoriasTemas() {
        const secretos = getCategoriaSecretos();
        return secretos ? [...categoriasTemas, secretos] : categoriasTemas;
    }
};

// ── Helpers privados ──────────────────────────────────────────────────────────
function _buscarPagina(lista, id) {
    for (const p of lista) {
        if (p.id === id) return p;
        if (p.hijos) { const h = _buscarPagina(p.hijos, id); if (h) return h; }
    }
    return null;
}

function _buscarTema(id) {
    return temasBasicos.find(t => t.id === id)
        || categoriasTemas.flatMap(c => c.temas).find(t => t.id === id)
        || null;
}

function _inyectarCSS(css) {
    let tag = document.getElementById('tema-activo');
    if (!tag) {
        tag = document.createElement('style');
        tag.id = 'tema-activo';
        document.head.appendChild(tag);
    }
    tag.textContent = css || '';
}

function _renderizar() {
    if (!_modulo) return;
    const el = document.getElementById('contenedor-central');
    el.innerHTML = typeof _modulo.contenido === 'string'
        ? _modulo.contenido
        : (_modulo.contenido[window.modoLecturaActual] || '');
    if (typeof _modulo.inicializar === 'function') _modulo.inicializar();
}

// ── API pública ───────────────────────────────────────────────────────────────
export async function cargarPagina(id) {
    const cfg = _buscarPagina(paginas, id) || paginas[0];
    _paginaActual = cfg;
    localStorage.setItem('pagina-actual', cfg.id);
    try {
        // cfg.ruta es relativa a la raíz: "paginas/inicio.js"
        // core.js vive en js/ → sube un nivel con ../
        _modulo = await import(`../${cfg.ruta}`);
        _renderizar();
        window.dispatchEvent(new CustomEvent('paginaCambiada', { detail: cfg.id }));
    } catch (err) {
        document.getElementById('contenedor-central').innerHTML =
            `<p style="color:var(--texto-secundario);padding:24px">
                Error cargando: <strong>${cfg.titulo}</strong>
             </p>`;
        console.error('[core] cargarPagina:', err);
    }
}

export function renderizarActual() { _renderizar(); }

export function aplicarTema(id) {
    localStorage.setItem('tema-guardado', id);
    document.body.className = document.body.className
        .replace(/\bmodo-oscuro\b|\btema-[\w-]+\b/g, '').trim();

    const esDark = id === 'dark'
        || (id === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if      (esDark)                              document.body.classList.add('modo-oscuro');
    else if (id !== 'light' && id !== 'auto')     document.body.classList.add(`tema-${id}`);

    _inyectarCSS(_buscarTema(id)?.css ?? null);
    window.dispatchEvent(new CustomEvent('temaCambiado', { detail: id }));
}

export function aplicarModoLectura(modo) {
    window.modoLecturaActual = modo;
    localStorage.setItem('modo-lectura-guardado', modo);
    document.body.classList.remove('lectura-detallada', 'lectura-resumida');
    document.body.classList.add(`lectura-${modo}`);
    window.dispatchEvent(new CustomEvent('modoLecturaCambiado', { detail: modo }));
    if (_modulo && typeof _modulo.contenido === 'object') _renderizar();
}

export function restablecer() {
    aplicarTema('auto');
    aplicarModoLectura('detallada');
    cargarPagina(paginas[0].id);
}

export function getPaginaActualId() {
    return _paginaActual?.id || paginas[0].id;
}
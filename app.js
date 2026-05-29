// app.js — Orquestador de UI
import { EstadoGlobal }  from './js/core.js';
import { construirSidebar, construirMenuTemas, restaurarDesplegados } from './js/builders.js';
import './js/componentes.js';

const cfg          = EstadoGlobal.config;
let   temaActual   = localStorage.getItem('tema-guardado') || 'auto';
const CICLO_TEMAS  = cfg.temasBasicos.map(t => t.id);   // ['auto','light','dark']

// ── Inicialización ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    construirMenuTemas(cfg, 'menu-flotante', cambiarTema);
    construirSidebar(cfg, 'menu-navegacion-paginas', id => {
        EstadoGlobal.cargarPagina(id);
        if (window.innerWidth < 768) document.body.classList.remove('sidebar-abierta');
    });

    aplicarModoLectura(window.modoLecturaActual);
    aplicarTema(temaActual);
    EstadoGlobal.cargarPagina(localStorage.getItem('pagina-actual') || cfg.paginas[0].id);

    if (window.innerWidth >= 768 && localStorage.getItem('sidebar-fijo') === '1')
        document.body.classList.add('sidebar-fijo');

    restaurarDesplegados();
});

// ── Sidebar activo ────────────────────────────────────────────────────────────
window.addEventListener('paginaCambiada', e => {
    document.querySelectorAll('#menu-navegacion-paginas .opcion-navegacion').forEach(el => {
        const activo = el.dataset.id === e.detail;
        el.style.color = activo ? 'var(--texto-principal)' : 'inherit';
        const btn = el.querySelector('.btn-interactivo');
        if (btn) btn.style.boxShadow = activo
            ? 'inset -1px -1px 3px var(--btn-sombra-clara), inset 1px 1px 3px var(--btn-sombra-oscura)'
            : '-1px -1px 4px var(--btn-sombra-clara), 1px 1px 4px var(--btn-sombra-oscura)';
    });
});

// ── Temas ─────────────────────────────────────────────────────────────────────
function cambiarTema(id) { temaActual = id; aplicarTema(id); cerrarMenus(); }

function aplicarTema(id) {
    temaActual = id;
    EstadoGlobal.aplicarTema(id);
    const tema = [...cfg.temasBasicos, ...cfg.categoriasTemas.flatMap(c => c.temas)]
        .find(t => t.id === id);
    const iconoEl = document.getElementById('icono-tema');
    iconoEl.textContent = tema?.icono ?? 'A';
    iconoEl.classList.remove('girando');
    void iconoEl.offsetWidth;
    iconoEl.classList.add('girando');
    setTimeout(() => iconoEl.classList.remove('girando'), 400);
    marcarCheck('#menu-flotante', id);
}

// ── Modo lectura ──────────────────────────────────────────────────────────────
function aplicarModoLectura(modo) {
    EstadoGlobal.aplicarModoLectura(modo);
    marcarCheck('#menu-opciones', modo);
    cerrarMenus();
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function marcarCheck(selector, valor) {
    document.querySelectorAll(`${selector} .item-tema-opcion`).forEach(el =>
        el.classList.toggle('seleccionado', el.dataset.tema === valor || el.dataset.modo === valor));
}
function cerrarMenus() {
    document.getElementById('menu-flotante').classList.remove('activo');
    document.getElementById('menu-opciones').classList.remove('activo');
}

// ── Eventos ───────────────────────────────────────────────────────────────────
const menuTemas    = document.getElementById('menu-flotante');
const menuOpciones = document.getElementById('menu-opciones');

document.getElementById('btn-rotar-tema').addEventListener('click', e => {
    e.stopPropagation();
    const i = CICLO_TEMAS.indexOf(temaActual);
    cambiarTema(CICLO_TEMAS[i === -1 ? 0 : (i + 1) % CICLO_TEMAS.length]);
});
document.getElementById('btn-toggle-temas').addEventListener('click', e => {
    e.stopPropagation(); menuOpciones.classList.remove('activo'); menuTemas.classList.toggle('activo');
});
document.getElementById('btn-toggle-opciones').addEventListener('click', e => {
    e.stopPropagation(); menuTemas.classList.remove('activo'); menuOpciones.classList.toggle('activo');
});
document.getElementById('opt-lectura-detallada').addEventListener('click', () => aplicarModoLectura('detallada'));
document.getElementById('opt-lectura-resumida').addEventListener('click',  () => aplicarModoLectura('resumida'));
document.getElementById('btn-abrir-sidebar').addEventListener('click', e => {
    e.stopPropagation(); document.body.classList.toggle('sidebar-abierta');
});
document.getElementById('btn-cerrar-sidebar').addEventListener('click', e => {
    e.stopPropagation();
    if (window.innerWidth >= 768) {
        const fijo = document.body.classList.toggle('sidebar-fijo');
        localStorage.setItem('sidebar-fijo', fijo ? '1' : '0');
    } else {
        document.body.classList.remove('sidebar-abierta');
    }
});
document.getElementById('overlay-sidebar').addEventListener('click', () =>
    document.body.classList.remove('sidebar-abierta'));

document.getElementById('btn-restablecer').addEventListener('click', () => {
    temaActual = 'auto';
    document.body.classList.remove('sidebar-fijo');
    localStorage.setItem('sidebar-fijo', '0');
    localStorage.removeItem('nav-desplegados');
    document.querySelectorAll('.nav-wrapper.nav-desplegado').forEach(w => {
        w.classList.remove('nav-desplegado');
        const tri = w.querySelector('.btn-nav-triangulo');
        if (tri) tri.setAttribute('aria-expanded', 'false');
    });
    EstadoGlobal.restablecer();
    marcarCheck('#menu-opciones', 'detallada');
});

document.addEventListener('click', cerrarMenus);
menuTemas.addEventListener('click',    e => e.stopPropagation());
menuOpciones.addEventListener('click', e => e.stopPropagation());

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (temaActual === 'auto') aplicarTema('auto');
});
window.addEventListener('navegarA', e => {
    EstadoGlobal.cargarPagina(e.detail);
    if (window.innerWidth < 768) document.body.classList.remove('sidebar-abierta');
});
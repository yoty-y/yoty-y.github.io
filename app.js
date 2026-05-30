// app.js — Orquestador de UI
// Importa funciones nombradas de core.js — sin objetos intermediarios
import {
    config,
    cargarPagina,
    aplicarTema,
    aplicarModoLectura,
    restablecer,
    getPaginaActualId
} from './js/core.js';
import { construirSidebar, construirMenuTemas, restaurarDesplegados } from './js/builders.js';
import './js/componentes.js';

// ── Estado de UI ──────────────────────────────────────────────────────────────
let temaActual  = localStorage.getItem('tema-guardado') || 'auto';
const CICLO     = config.temasBasicos.map(t => t.id);   // ['auto','light','dark']

// ── Inicialización ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Construir menús
    construirMenuTemas(config, 'menu-flotante', _cambiarTema);
    construirSidebar(config, 'menu-navegacion-paginas', id => {
        cargarPagina(id);
        if (window.innerWidth < 768) document.body.classList.remove('sidebar-abierta');
    });

    // Aplicar estado guardado
    _aplicarTemaUI(temaActual);
    _aplicarModoLecturaUI(window.modoLecturaActual);
    cargarPagina(localStorage.getItem('pagina-actual') || config.paginas[0].id);

    if (window.innerWidth >= 768 && localStorage.getItem('sidebar-fijo') === '1')
        document.body.classList.add('sidebar-fijo');

    restaurarDesplegados();
});

// ── Sidebar: resaltar página activa ──────────────────────────────────────────
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
function _cambiarTema(id) { _aplicarTemaUI(id); _cerrarMenus(); }

function _aplicarTemaUI(id) {
    temaActual = id;
    aplicarTema(id);   // core: clase CSS + inyección

    // Icono del botón
    const tema = [...config.temasBasicos, ...config.categoriasTemas.flatMap(c => c.temas)]
        .find(t => t.id === id);
    const iconoEl = document.getElementById('icono-tema');
    iconoEl.textContent = tema?.icono ?? 'A';
    iconoEl.classList.remove('girando');
    void iconoEl.offsetWidth;
    iconoEl.classList.add('girando');
    setTimeout(() => iconoEl.classList.remove('girando'), 400);

    _marcarCheck('#menu-flotante', id);
}

// ── Modo lectura ──────────────────────────────────────────────────────────────
function _aplicarModoLecturaUI(modo) {
    aplicarModoLectura(modo);   // core
    _marcarCheck('#menu-opciones', modo);
    _cerrarMenus();
}

// ── Helpers UI ────────────────────────────────────────────────────────────────
function _marcarCheck(selector, valor) {
    document.querySelectorAll(`${selector} .item-tema-opcion`).forEach(el =>
        el.classList.toggle('seleccionado',
            el.dataset.tema === valor || el.dataset.modo === valor));
}

function _cerrarMenus() {
    document.getElementById('menu-flotante').classList.remove('activo');
    document.getElementById('menu-opciones').classList.remove('activo');
}

// ── Eventos ───────────────────────────────────────────────────────────────────
const menuTemas    = document.getElementById('menu-flotante');
const menuOpciones = document.getElementById('menu-opciones');

// Ciclo temas básicos
document.getElementById('btn-rotar-tema').addEventListener('click', e => {
    e.stopPropagation();
    const i = CICLO.indexOf(temaActual);
    _cambiarTema(CICLO[i === -1 ? 0 : (i + 1) % CICLO.length]);
});

// Menús flotantes
document.getElementById('btn-toggle-temas').addEventListener('click', e => {
    e.stopPropagation();
    menuOpciones.classList.remove('activo');
    menuTemas.classList.toggle('activo');
});
document.getElementById('btn-toggle-opciones').addEventListener('click', e => {
    e.stopPropagation();
    menuTemas.classList.remove('activo');
    menuOpciones.classList.toggle('activo');
});

// Modos de lectura
document.getElementById('opt-lectura-detallada').addEventListener('click',
    () => _aplicarModoLecturaUI('detallada'));
document.getElementById('opt-lectura-resumida').addEventListener('click',
    () => _aplicarModoLecturaUI('resumida'));

// Sidebar
document.getElementById('btn-abrir-sidebar').addEventListener('click', e => {
    e.stopPropagation();
    document.body.classList.toggle('sidebar-abierta');
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

// Restablecer
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
    restablecer();   // core
    _marcarCheck('#menu-opciones', 'detallada');
    _marcarCheck('#menu-flotante', 'auto');
    document.getElementById('icono-tema').textContent = 'A';
});

// Cerrar menús al clic fuera
document.addEventListener('click', _cerrarMenus);
menuTemas.addEventListener('click',    e => e.stopPropagation());
menuOpciones.addEventListener('click', e => e.stopPropagation());

// Auto-tema según sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (temaActual === 'auto') _aplicarTemaUI('auto');
});

// Navegación programática desde páginas
window.addEventListener('navegarA', e => {
    cargarPagina(e.detail);
    if (window.innerWidth < 768) document.body.classList.remove('sidebar-abierta');
});

// Regenerar menú de temas cuando se desbloquea un tema secreto
window.addEventListener('temaSecretoDesbloqueado', () => {
    construirMenuTemas(config, 'menu-flotante', _cambiarTema);
});
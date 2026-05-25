// app.js — Punto de entrada. Solo orquesta; toda la lógica vive en js/
import { configSitio }                      from './config.js';
import { EstadoGlobal }                     from './js/core.js';
import { construirSidebar, construirMenuTemas } from './js/builders.js';
import './js/componentes.js';   // registra <texto-dinamico>

// ─── Estado local de UI ───────────────────────────────────────────────────────
let temaActual = localStorage.getItem('tema-guardado') || 'auto';
const TEMAS_BASICOS = configSitio.temasBasicos.map(t => t.id);   // ['auto','light','dark']

// ─── Inicialización ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Construir menús desde config
    construirMenuTemas(configSitio, 'menu-flotante', cambiarTema);
    construirSidebar(configSitio, 'menu-navegacion-paginas', idPagina => {
        EstadoGlobal.cargarPagina(idPagina);
        if (window.innerWidth < 768) document.body.classList.remove('sidebar-abierta');
    });

    // Aplicar estado guardado
    aplicarModoLectura(window.modoLecturaActual);
    aplicarTema(temaActual);
    EstadoGlobal.cargarPagina(EstadoGlobal.paginaActualId);
});

// ─── Escucha cambios de página para resaltar el item activo ──────────────────
window.addEventListener('paginaCambiada', e => actualizarSidebarActivo(e.detail));

function actualizarSidebarActivo(idActivo) {
    document.querySelectorAll('#menu-navegacion-paginas .opcion-navegacion').forEach(el => {
        const esActiva = el.dataset.id === idActivo;
        el.style.color = esActiva ? 'var(--texto-principal)' : 'inherit';
        const btn = el.querySelector('.btn-interactivo');
        if (btn) btn.style.boxShadow = esActiva
            ? 'inset -1px -1px 3px var(--btn-sombra-clara), inset 1px 1px 3px var(--btn-sombra-oscura)'
            : '-1px -1px 4px var(--btn-sombra-clara), 1px 1px 4px var(--btn-sombra-oscura)';
    });
}

// ─── Temas ────────────────────────────────────────────────────────────────────
function cambiarTema(idTema) {
    temaActual = idTema;
    aplicarTema(idTema);
    cerrarMenus();
}

function aplicarTema(idTema) {
    temaActual = idTema;
    EstadoGlobal.aplicarTema(idTema);

    // Determinar icono del botón
    const basico = configSitio.temasBasicos.find(t => t.id === idTema);
    let icono = basico ? basico.icono : null;

    if (!icono) {
        const todos = configSitio.categoriasTemas.flatMap(c => c.temas);
        const encontrado = todos.find(t => t.id === idTema);
        icono = encontrado ? encontrado.icono : 'A';
    }

    const iconoEl = document.getElementById('icono-tema');
    iconoEl.textContent = icono;
    iconoEl.classList.remove('girando');
    void iconoEl.offsetWidth; // forzar reflow para reiniciar animación
    iconoEl.classList.add('girando');
    setTimeout(() => iconoEl.classList.remove('girando'), 400);

    marcarCheckActivo('#menu-flotante', idTema);
}

// ─── Modo lectura ─────────────────────────────────────────────────────────────
function aplicarModoLectura(modo) {
    EstadoGlobal.aplicarModoLectura(modo);
    marcarCheckActivo('#menu-opciones', modo);
    cerrarMenus();
}

// ─── Helpers UI ──────────────────────────────────────────────────────────────
function marcarCheckActivo(selectorMenu, valorActivo) {
    document.querySelectorAll(`${selectorMenu} .item-tema-opcion`).forEach(el => {
        el.classList.toggle('seleccionado',
            el.dataset.tema === valorActivo || el.dataset.modo === valorActivo);
    });
}

function cerrarMenus() {
    document.getElementById('menu-flotante').classList.remove('activo');
    document.getElementById('menu-opciones').classList.remove('activo');
}

// ─── Eventos de interfaz ──────────────────────────────────────────────────────
const menuTemas   = document.getElementById('menu-flotante');
const menuOpciones = document.getElementById('menu-opciones');

// Ciclo de 3 temas básicos
document.getElementById('btn-rotar-tema').addEventListener('click', e => {
    e.stopPropagation();
    const idx = TEMAS_BASICOS.indexOf(temaActual);
    cambiarTema(TEMAS_BASICOS[idx === -1 ? 0 : (idx + 1) % TEMAS_BASICOS.length]);
});

// Abrir / cerrar menús
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
document.getElementById('opt-lectura-detallada').addEventListener('click', () => aplicarModoLectura('detallada'));
document.getElementById('opt-lectura-resumida').addEventListener('click',  () => aplicarModoLectura('resumida'));

// Sidebar móvil
document.getElementById('btn-abrir-sidebar').addEventListener('click', e => {
    e.stopPropagation();
    document.body.classList.toggle('sidebar-abierta');
});
document.getElementById('btn-cerrar-sidebar').addEventListener('click', e => {
    e.stopPropagation();
    if (window.innerWidth >= 768) {
        // Desktop: ☰ fija o libera el sidebar (clase separada de la móvil)
        document.body.classList.toggle('sidebar-fijo');
    } else {
        // Móvil: siempre cierra
        document.body.classList.remove('sidebar-abierta');
    }
});
document.getElementById('overlay-sidebar').addEventListener('click', () =>
    document.body.classList.remove('sidebar-abierta'));

// Restablecer
document.getElementById('btn-restablecer').addEventListener('click', () => {
    temaActual = 'auto';
    document.body.classList.remove('sidebar-fijo');
    EstadoGlobal.restablecer();
    aplicarTema('auto');
    aplicarModoLectura('detallada');
    marcarCheckActivo('#menu-opciones', 'detallada');
});

// Cerrar menús al clic fuera
document.addEventListener('click', cerrarMenus);
menuTemas.addEventListener('click',    e => e.stopPropagation());
menuOpciones.addEventListener('click', e => e.stopPropagation());

// Actualizar tema 'auto' si el sistema cambia claro/oscuro
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (temaActual === 'auto') aplicarTema('auto');
});
// ─── Navegación programática (páginas con sidebar: false) ─────────────────────
window.addEventListener('navegarA', e => {
    EstadoGlobal.cargarPagina(e.detail);
    if (window.innerWidth < 768) document.body.classList.remove('sidebar-abierta');
});
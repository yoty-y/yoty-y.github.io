// app.js
import { configSitio } from './config.js';
import { EstadoGlobal } from './js/core.js';
import { construirSidebar, construirMenuTemas } from './js/builders.js';
import './js/componentes.js'; // Activa el <texto-dinamico>

document.addEventListener('DOMContentLoaded', () => {
    // 1. Construir Interfaz
    construirSidebar(configSitio, 'menu-navegacion-paginas', id => {
        EstadoGlobal.cargarPagina(id);
        if(window.innerWidth < 768) document.body.classList.remove('sidebar-abierta');
    });

    construirMenuTemas(configSitio, 'menu-flotante', id => {
        EstadoGlobal.aplicarTema(id);
        cerrarMenus();
    });

    // 2. Cargar Estado Inicial
    const temaGuardado = localStorage.getItem('tema-guardado') || 'auto';
    EstadoGlobal.aplicarTema(temaGuardado);
    EstadoGlobal.aplicarModoLectura(window.modoLecturaActual);
    
    const paginaGuardada = localStorage.getItem('pagina-actual') || configSitio.paginas[0].id;
    EstadoGlobal.cargarPagina(paginaGuardada);

    // 3. Eventos de la UI
    document.getElementById('opt-lectura-detallada').addEventListener('click', () => { EstadoGlobal.aplicarModoLectura('detallada'); cerrarMenus(); });
    document.getElementById('opt-lectura-resumida').addEventListener('click', () => { EstadoGlobal.aplicarModoLectura('resumida'); cerrarMenus(); });
    document.getElementById('btn-restablecer').addEventListener('click', () => { EstadoGlobal.restablecer(); cerrarMenus(); });
    
    // Toggles de menús
    const menuTemas = document.getElementById('menu-flotante');
    const menuOpciones = document.getElementById('menu-opciones');
    
    document.getElementById('btn-toggle-temas').addEventListener('click', e => { e.stopPropagation(); menuOpciones.classList.remove('activo'); menuTemas.classList.toggle('activo'); });
    document.getElementById('btn-toggle-opciones').addEventListener('click', e => { e.stopPropagation(); menuTemas.classList.remove('activo'); menuOpciones.classList.toggle('activo'); });
    
    // Sidebar
    const toggleSidebar = (e) => { e.stopPropagation(); document.body.classList.toggle('sidebar-abierta'); };
    document.getElementById('btn-abrir-sidebar').addEventListener('click', toggleSidebar);
    document.getElementById('btn-cerrar-sidebar').addEventListener('click', toggleSidebar);
    document.getElementById('overlay-sidebar').addEventListener('click', () => document.body.classList.remove('sidebar-abierta'));

    function cerrarMenus() {
        menuTemas.classList.remove('activo');
        menuOpciones.classList.remove('activo');
    }
    document.addEventListener('click', cerrarMenus);
});

// Sincronizar UI cuando cambian cosas
window.addEventListener('modoLecturaCambiado', (e) => {
    document.querySelectorAll('.menu-opciones-flotante .item-tema-opcion').forEach(el => el.classList.remove('seleccionado'));
    document.querySelector(`[data-modo="${e.detail}"]`)?.classList.add('seleccionado');
});

window.addEventListener('temaCambiado', (e) => {
    document.querySelectorAll('.menu-temas-flotante .item-tema-opcion').forEach(el => el.classList.remove('seleccionado'));
    document.querySelector(`[data-tema="${e.detail}"]`)?.classList.add('seleccionado');
    
    const temaConfig = configSitio.categoriasTemas.flatMap(c => c.temas).find(t => t.id === e.detail);
    if(temaConfig) document.getElementById('icono-tema').textContent = temaConfig.icono;
});

window.addEventListener('paginaCambiada', (e) => {
    document.querySelectorAll('.opcion-navegacion').forEach(el => {
        el.style.color = el.dataset.id === e.detail ? 'var(--texto-principal)' : 'inherit';
    });
});
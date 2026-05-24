import { configSitio } from './config.js';

let temaActual = localStorage.getItem('tema-guardado') || 'auto';
let modoLecturaActual = localStorage.getItem('modo-lectura-guardado') || 'detallada';
let paginaActualId = localStorage.getItem('pagina-actual') || configSitio.paginas[0].id;
let moduloPaginaActual = null;

document.addEventListener('DOMContentLoaded', () => {
    inicializarEventos();
    construirMenuTemas();
    construirMenuSidebar();
    aplicarTema(temaActual);
    aplicarModoLectura(modoLecturaActual);
    cargarPagina(paginaActualId);
});

function inicializarEventos() {
    // Toggle Sidebar escritorio y móvil
    const toggleSidebar = () => document.body.classList.toggle('sidebar-abierta');
    document.getElementById('btn-toggle-sidebar-manual').onclick = toggleSidebar;
    document.getElementById('btn-abrir-movil').onclick = toggleSidebar;
    document.getElementById('overlay-sidebar').onclick = () => document.body.classList.remove('sidebar-abierta');

    // Menús flotantes (Tres puntos y Temas)
    const btnTemas = document.getElementById('btn-abrir-temas');
    const btnOpciones = document.getElementById('btn-abrir-opciones');
    const menuTemas = document.getElementById('menu-temas');
    const menuOpciones = document.getElementById('menu-opciones');

    btnTemas.onclick = (e) => {
        e.stopPropagation();
        menuOpciones.classList.remove('activo');
        menuTemas.classList.toggle('activo');
    };

    btnOpciones.onclick = (e) => {
        e.stopPropagation();
        menuTemas.classList.remove('activo');
        menuOpciones.classList.toggle('activo');
    };

    document.addEventListener('click', () => {
        menuTemas.classList.remove('activo');
        menuOpciones.classList.remove('activo');
    });

    // Modos de lectura
    document.getElementById('opt-lectura-detallada').onclick = () => aplicarModoLectura('detallada');
    document.getElementById('opt-lectura-resumida').onclick = () => aplicarModoLectura('resumida');
    document.getElementById('btn-restablecer').onclick = () => {
        localStorage.clear();
        location.reload();
    };
}

async function cargarPagina(id) {
    const pag = configSitio.paginas.find(p => p.id === id);
    if (!pag) return;
    paginaActualId = id;
    localStorage.setItem('pagina-actual', id);
    
    try {
        const modulo = await import(`./paginas/${pag.archivo}`);
        moduloPaginaActual = modulo.contenido;
        document.getElementById('contenedor-central').innerHTML = moduloPaginaActual[modoLecturaActual];
        document.getElementById('titulo-pagina').textContent = pag.titulo;
        construirMenuSidebar(); 
    } catch (e) { console.error("Error:", e); }
}

function construirMenuSidebar() {
    const nav = document.getElementById('menu-navegacion-paginas');
    nav.innerHTML = '';

    const render = (padreId, contenedor) => {
        const hijos = configSitio.paginas.filter(p => p.padre === padreId && p.visible === 1);
        hijos.forEach(pag => {
            const grupo = document.createElement('div');
            grupo.className = 'bloque-menu-grupo';
            
            const item = document.createElement('div');
            item.className = `opcion-navegacion ${paginaActualId === pag.id ? 'activa' : ''}`;
            
            const tieneHijos = configSitio.paginas.some(p => p.padre === pag.id && p.visible === 1);
            
            item.innerHTML = `
                <button class="btn-interactivo"><span>${pag.icono}</span></button>
                <div class="texto-opcion">
                    <span class="nav-link">${pag.titulo}</span>
                    ${tieneHijos ? `<span class="flecha-desplegable">▼</span>` : ''}
                </div>
            `;

            // Lógica solicitada: Icono y Texto NAVEGAN. Flecha DESPLIEGA.
            item.querySelector('.btn-interactivo').onclick = () => cargarPagina(pag.id);
            item.querySelector('.nav-link').onclick = () => cargarPagina(pag.id);

            grupo.appendChild(item);

            if (tieneHijos) {
                const sub = document.createElement('div');
                sub.className = 'submenu-hijos';
                const flecha = item.querySelector('.flecha-desplegable');
                
                flecha.onclick = (e) => {
                    e.stopPropagation();
                    sub.classList.toggle('activo');
                    flecha.classList.toggle('rotada');
                };

                render(pag.id, sub);
                grupo.appendChild(sub);
            }
            contenedor.appendChild(grupo);
        });
    };
    render(null, nav);
}

function construirMenuTemas() {
    const cont = document.getElementById('menu-temas');
    let html = configSitio.categoriasTemas.map(cat => `
        <div class="carpeta-cabecera" style="font-weight:bold; font-size:0.7rem; margin-top:5px; opacity:0.6">${cat.nombre}</div>
        ${cat.temas.map(t => `<div class="item-tema-opcion" data-tema="${t.id}">${t.icono} ${t.nombre}</div>`).join('')}
    `).join('');
    cont.innerHTML = html;
    cont.querySelectorAll('.item-tema-opcion').forEach(el => {
        el.onclick = () => {
            temaActual = el.dataset.tema;
            localStorage.setItem('tema-guardado', temaActual);
            aplicarTema(temaActual);
        };
    });
}

function aplicarTema(id) {
    document.body.className = document.body.className.replace(/tema-\w+|modo-oscuro/g, '').trim();
    if (id === 'dark') document.body.classList.add('modo-oscuro');
    else if (id !== 'auto' && id !== 'light') document.body.classList.add(`tema-${id}`);
    document.getElementById('icono-tema').textContent = id === 'dark' ? '☽' : 'A';
}

function aplicarModoLectura(modo) {
    modoLecturaActual = modo;
    localStorage.setItem('modo-lectura-guardado', modo);
    document.body.classList.remove('lectura-detallada', 'lectura-resumida');
    document.body.classList.add(`lectura-${modo}`);
    if (moduloPaginaActual) document.getElementById('contenedor-central').innerHTML = moduloPaginaActual[modo];
}
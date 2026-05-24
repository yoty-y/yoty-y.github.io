import { configSitio } from './config.js';

let temaActual = localStorage.getItem('tema-guardado') || 'auto';
let modoLecturaActual = localStorage.getItem('modo-lectura-guardado') || 'detallada';
let paginaActualId = localStorage.getItem('pagina-actual') || configSitio.paginas[0].id;
let moduloPaginaActual = null;

document.addEventListener('DOMContentLoaded', () => {
    inicializarUI();
    construirMenuSidebar();
    aplicarTema(temaActual);
    aplicarModoLectura(modoLecturaActual);
    cargarPagina(paginaActualId);
});

function inicializarUI() {
    // Toggle Sidebar (Solo el botón de las 3 rayas)
    const toggle = () => document.body.classList.toggle('sidebar-abierta');
    document.getElementById('btn-cerrar-sidebar').onclick = toggle;
    document.getElementById('btn-abrir-sidebar').onclick = toggle;
    document.getElementById('overlay-sidebar').onclick = () => document.body.classList.remove('sidebar-abierta');

    // Menús flotantes
    const btnTemas = document.getElementById('btn-abrir-temas');
    const btnOpciones = document.getElementById('btn-toggle-opciones');
    const menuTemas = document.getElementById('menu-flotante');
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

    document.getElementById('opt-lectura-detallada').onclick = () => aplicarModoLectura('detallada');
    document.getElementById('opt-lectura-resumida').onclick = () => aplicarModoLectura('resumida');
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
        construirMenuSidebar(); // Refrescar para marcar activo
    } catch (e) { console.error("Error al cargar página:", e); }
}

function construirMenuSidebar() {
    const nav = document.getElementById('menu-navegacion-paginas');
    nav.innerHTML = '';

    // Función recursiva para niveles infinitos
    const renderNivel = (padreId, contenedor) => {
        const paginas = configSitio.paginas.filter(p => p.padre === padreId && p.visible === 1);
        
        paginas.forEach(pag => {
            const grupo = document.createElement('div');
            grupo.className = 'bloque-menu-grupo';
            
            const tieneHijos = configSitio.paginas.some(p => p.padre === pag.id && p.visible === 1);
            const estaActiva = paginaActualId === pag.id;

            const item = document.createElement('div');
            item.className = `opcion-navegacion ${estaActiva ? 'activa' : ''}`;
            
            item.innerHTML = `
                <button class="btn-interactivo"><span>${pag.icono}</span></button>
                <div class="texto-opcion">
                    <span class="label-nav">${pag.titulo}</span>
                    ${tieneHijos ? `<span class="flecha-desplegable">▼</span>` : ''}
                </div>
            `;

            // CLIC EN ICONO O TEXTO: NAVEGA
            item.querySelector('.btn-interactivo').onclick = () => cargarPagina(pag.id);
            item.querySelector('.label-nav').onclick = () => cargarPagina(pag.id);

            grupo.appendChild(item);

            if (tieneHijos) {
                const subContenedor = document.createElement('div');
                subContenedor.className = 'submenu-hijos';
                
                // CLIC EN FLECHA: DESPLIEGA
                const flecha = item.querySelector('.flecha-desplegable');
                flecha.onclick = (e) => {
                    e.stopPropagation();
                    subContenedor.classList.toggle('activo');
                    flecha.classList.toggle('rotada');
                };

                renderNivel(pag.id, subContenedor);
                grupo.appendChild(subContenedor);
            }
            contenedor.appendChild(grupo);
        });
    };

    renderNivel(null, nav);
}

// Lógica de Temas (Simplificada para que funcione siempre)
function aplicarTema(id) {
    document.body.className = document.body.className.replace(/tema-\w+|modo-oscuro/g, '').trim();
    if (id === 'dark') document.body.classList.add('modo-oscuro');
    else if (id !== 'auto' && id !== 'light') document.body.classList.add(`tema-${id}`);
}

function aplicarModoLectura(modo) {
    modoLecturaActual = modo;
    localStorage.setItem('modo-lectura-guardado', modo);
    document.body.classList.remove('lectura-detallada', 'lectura-resumida');
    document.body.classList.add(`lectura-${modo}`);
    if (moduloPaginaActual) document.getElementById('contenedor-central').innerHTML = moduloPaginaActual[modo];
}
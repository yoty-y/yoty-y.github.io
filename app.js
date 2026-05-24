import { configSitio } from './config.js';

let temaActual = localStorage.getItem('tema-guardado') || 'auto';
let modoLecturaActual = localStorage.getItem('modo-lectura-guardado') || 'detallada';
let paginaActualId = localStorage.getItem('pagina-actual') || configSitio.paginas[0].id;
let moduloPaginaActual = null;

document.addEventListener('DOMContentLoaded', () => {
    construirMenuTemas();
    construirMenuSidebar();
    aplicarModoLectura(modoLecturaActual);
    aplicarTema(temaActual);
    cargarPagina(paginaActualId);
});

async function cargarPagina(id) {
    const paginaConfig = configSitio.paginas.find(p => p.id === id);
    if (!paginaConfig) return;

    paginaActualId = id;
    localStorage.setItem('pagina-actual', id);

    try {
        const modulo = await import(`./paginas/${paginaConfig.archivo}`);
        moduloPaginaActual = modulo.contenido;
        
        const contenedor = document.getElementById('contenedor-central');
        if (contenedor) contenedor.innerHTML = moduloPaginaActual[modoLecturaActual];
        
        construirMenuSidebar(); // Refrescar para marcar activa
    } catch (error) {
        console.error("Error cargando página:", error);
    }
}

function construirMenuSidebar() {
    const nav = document.getElementById('menu-navegacion-paginas');
    nav.innerHTML = '';

    function verificarRamaActiva(idPadre) {
        const hijos = configSitio.paginas.filter(p => p.padre === idPadre);
        return hijos.some(h => h.id === paginaActualId || verificarRamaActiva(h.id));
    }

    function renderizarNivel(idPadre, contenedorDestino) {
        const paginasNivel = configSitio.paginas.filter(p => p.padre === idPadre && p.visible === 1);
        
        paginasNivel.forEach(pag => {
            const bloqueGrupo = document.createElement('div');
            bloqueGrupo.className = 'bloque-menu-grupo';

            const hijos = configSitio.paginas.filter(p => p.padre === pag.id && p.visible === 1);
            const tieneHijos = hijos.length > 0;
            const esActiva = paginaActualId === pag.id;

            const btnOpcion = document.createElement('div');
            btnOpcion.className = `opcion-navegacion ${esActiva ? 'activa' : ''}`;
            
            btnOpcion.innerHTML = `
                <button class="btn-interactivo"><span>${pag.icono}</span></button>
                <div class="texto-opcion">
                    <span class="nombre-pagina">${pag.titulo}</span>
                    ${tieneHijos ? `<span class="flecha-desplegable ${verificarRamaActiva(pag.id) ? 'rotada' : ''}">▼</span>` : ''}
                </div>
            `;

            // Navegar al hacer clic en el botón o en el nombre
            btnOpcion.querySelector('.btn-interactivo').onclick = () => cargarPagina(pag.id);
            btnOpcion.querySelector('.nombre-pagina').onclick = () => cargarPagina(pag.id);

            bloqueGrupo.appendChild(btnOpcion);

            if (tieneHijos) {
                const submenu = document.createElement('div');
                submenu.className = 'submenu-hijos';
                if (verificarRamaActiva(pag.id)) submenu.classList.add('activo');

                renderizarNivel(pag.id, submenu);
                bloqueGrupo.appendChild(submenu);

                // Solo la flecha controla el despliegue manual
                btnOpcion.querySelector('.flecha-desplegable').onclick = (e) => {
                    e.stopPropagation();
                    submenu.classList.toggle('activo');
                    e.target.classList.toggle('rotada');
                };
            }

            contenedorDestino.appendChild(bloqueGrupo);
        });
    }
    renderizarNivel(null, nav);
}

// FUNCIONES DE INTERFAZ (Temas y Modos)
function construirMenuTemas() {
    const contenedor = document.getElementById('menu-flotante');
    let html = `<div class="item-tema-opcion" data-tema="auto"><span>A Automático</span></div><div class="menu-divisor-linea"></div>`;
    configSitio.categoriasTemas.forEach(cat => {
        html += `<div class="carpeta-cabecera">${cat.nombre}</div><div class="carpeta-contenido">`;
        cat.temas.forEach(t => {
            html += `<div class="item-tema-opcion" data-tema="${t.id}"><span>${t.icono} ${t.nombre}</span></div>`;
        });
        html += `</div>`;
    });
    contenedor.innerHTML = html;
    contenedor.querySelectorAll('.item-tema-opcion').forEach(i => i.onclick = () => {
        temaActual = i.dataset.tema;
        localStorage.setItem('tema-guardado', temaActual);
        aplicarTema(temaActual);
    });
}

function aplicarTema(id) {
    document.body.className = document.body.className.replace(/modo-oscuro|tema-\w+/g, '').trim();
    if (id === 'dark' || (id === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) document.body.classList.add('modo-oscuro');
    else if (id !== 'light' && id !== 'auto') document.body.classList.add(`tema-${id}`);
}

function aplicarModoLectura(modo) {
    modoLecturaActual = modo;
    localStorage.setItem('modo-lectura-guardado', modo);
    document.body.classList.remove('lectura-detallada', 'lectura-resumida');
    document.body.classList.add(`lectura-${modo}`);
    if (moduloPaginaActual) document.getElementById('contenedor-central').innerHTML = moduloPaginaActual[modo];
}

// EVENTOS DE BOTONES CABECERA
document.getElementById('btn-toggle-temas').onclick = (e) => { e.stopPropagation(); document.getElementById('menu-flotante').classList.toggle('activo'); };
document.getElementById('btn-abrir-sidebar').onclick = () => document.body.classList.add('sidebar-abierta');
document.getElementById('btn-cerrar-sidebar').onclick = () => document.body.classList.remove('sidebar-abierta');
document.getElementById('opt-lectura-detallada').onclick = () => aplicarModoLectura('detallada');
document.getElementById('opt-lectura-resumida').onclick = () => aplicarModoLectura('resumida');

window.cargarPagina = cargarPagina; // Para botones dentro de las páginas
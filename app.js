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
        aplicarModoLectura(modoLecturaActual);
        construirMenuSidebar(); // Redibuja el menú para resaltar la pestaña activa
    } catch (error) {
        console.error("Error al cargar la página:", error);
    }
}

// MOTOR DE RENDERIZADO RECURSIVO DEL SIDEBAR
function construirMenuSidebar() {
    const nav = document.getElementById('menu-navegacion-paginas');
    nav.innerHTML = '';

    function verificarRamaActiva(idNodo) {
        if (paginaActualId === idNodo) return true;
        const hijos = configSitio.paginas.filter(p => p.padre === idNodo);
        return hijos.some(hijo => verificarRamaActiva(hijo.id));
    }

    function renderizarNivel(idPadre, contenedorDestino) {
        // Solo renderiza las páginas que tienen visible: 1
        const paginasNivel = configSitio.paginas.filter(p => p.padre === idPadre && p.visible === 1);
        if (paginasNivel.length === 0) return;

        paginasNivel.forEach(pag => {
            const bloqueGrupo = document.createElement('div');
            bloqueGrupo.className = 'bloque-menu-grupo';

            const hijos = configSitio.paginas.filter(p => p.padre === pag.id && p.visible === 1);
            const tieneHijos = hijos.length > 0;

            const btnOpcion = document.createElement('div');
            // Mantiene el color base o lo resalta si está activo
            btnOpcion.className = `opcion-navegacion ${paginaActualId === pag.id ? 'activa' : ''}`;
            btnOpcion.style.color = paginaActualId === pag.id ? 'var(--texto-principal)' : 'inherit';

            const indicadorFlecha = tieneHijos ? `<span class="flecha-desplegable ${verificarRamaActiva(pag.id) ? 'rotada' : ''}">▼</span>` : '';

            btnOpcion.innerHTML = `
                <button class="btn-interactivo" style="flex-shrink: 0;"><span>${pag.icono || '📄'}</span></button>
                <span class="texto-opcion" style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
                    ${pag.titulo} ${indicadorFlecha}
                </span>
            `;

            bloqueGrupo.appendChild(btnOpcion);

            if (tieneHijos) {
                const submenu = document.createElement('div');
                submenu.className = 'submenu-hijos';

                if (verificarRamaActiva(pag.id)) {
                    submenu.classList.add('activo');
                }

                renderizarNivel(pag.id, submenu);
                bloqueGrupo.appendChild(submenu);

                btnOpcion.addEventListener('click', (e) => {
                    e.stopPropagation();
                    cargarPagina(pag.id);
                    submenu.classList.toggle('activo');
                    const flecha = btnOpcion.querySelector('.flecha-desplegable');
                    if (flecha) flecha.classList.toggle('rotada');
                });
            } else {
                btnOpcion.addEventListener('click', (e) => {
                    e.stopPropagation();
                    cargarPagina(pag.id);
                });
            }

            contenedorDestino.appendChild(bloqueGrupo);
        });
    }

    renderizarNivel(null, nav);
}

// Expone la función al objeto window para poder usar onclick en el HTML de las páginas
window.cargarPagina = cargarPagina;

function construirMenuTemas() {
    const contenedor = document.getElementById('menu-flotante');
    let htmlTemas = `
        <div class="item-tema-opcion" data-tema="auto">
            <div class="item-flex-izq"><div class="circulo-color" style="background-color: #a1a1aa;"></div><span>A &nbsp;Automático</span></div>
            <span class="check-seleccionado">✓</span>
        </div>
        <div class="item-tema-opcion" data-tema="light">
            <div class="item-flex-izq"><div class="circulo-color" style="background-color: #ffffff; border: 1px solid #cbd5e1;"></div><span>☼ Claro</span></div>
            <span class="check-seleccionado">✓</span>
        </div>
        <div class="item-tema-opcion" data-tema="dark">
            <div class="item-flex-izq"><div class="circulo-color" style="background-color: #1e1e1e;"></div><span>☽ Oscuro</span></div>
            <span class="check-seleccionado">✓</span>
        </div>
        <div class="menu-divisor-linea"></div>
    `;

    configSitio.categoriasTemas.forEach(cat => {
        let htmlCat = '';
        cat.temas.forEach(tema => {
            htmlCat += `
                <div class="item-tema-opcion" data-tema="${tema.id}">
                    <div class="item-flex-izq"><div class="circulo-color" style="background-color: ${tema.color};"></div><span>${tema.icono} ${tema.nombre.split(' ').slice(1).join(' ')}</span></div>
                    <span class="check-seleccionado">✓</span>
                </div>`;
        });
        htmlTemas += `
            <div class="carpeta-categoria">
                <div class="carpeta-cabecera">
                    <span>${cat.nombre}</span><span class="indicador-flecha">▼</span>
                </div>
                <div class="carpeta-contenido">${htmlCat}</div>
            </div>`;
    });
    
    contenedor.innerHTML = htmlTemas;

    document.querySelectorAll('#menu-flotante .item-tema-opcion').forEach(item => {
        item.addEventListener('click', () => cambiarTema(item.dataset.tema));
    });

    document.querySelectorAll('.carpeta-cabecera').forEach(cabecera => {
        cabecera.addEventListener('click', (e) => {
            e.stopPropagation();
            const carpeta = cabecera.parentElement;
            const abierta = carpeta.classList.contains('abierta');
            document.querySelectorAll('.carpeta-categoria').forEach(c => c.classList.remove('abierta'));
            if (!abierta) carpeta.classList.add('abierta');
        });
    });
}

function cambiarTema(idTema) {
    localStorage.setItem('tema-guardado', idTema);
    aplicarTema(idTema);
    cerrarMenus();
}

function aplicarTema(idTema) {
    document.body.className = document.body.className.replace(/modo-oscuro|tema-\w+/g, '').trim();
    
    let icono = 'A';
    if (idTema === 'dark' || (idTema === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('modo-oscuro');
        icono = idTema === 'dark' ? '☽' : 'A';
    } else if (idTema === 'light') {
        icono = '☼';
    } else if (idTema !== 'auto') {
        document.body.classList.add(`tema-${idTema}`);
        const temaEncontrado = configSitio.categoriasTemas.flatMap(c => c.temas).find(t => t.id === idTema);
        if (temaEncontrado) icono = temaEncontrado.icono;
    }
    
    document.getElementById('icono-tema').textContent = icono;
    
    document.querySelectorAll(`#menu-flotante .item-tema-opcion`).forEach(el => {
        el.classList.toggle('seleccionado', el.dataset.tema === idTema);
    });
}

function aplicarModoLectura(modo) {
    modoLecturaActual = modo;
    localStorage.setItem('modo-lectura-guardado', modo);
    
    document.body.classList.remove('lectura-detallada', 'lectura-resumida');
    document.body.classList.add(`lectura-${modo}`);
    
    document.querySelectorAll(`#menu-opciones .item-tema-opcion`).forEach(el => {
        el.classList.remove('seleccionado');
        if (el.dataset.modo === modo) el.classList.add('seleccionado');
    });

    const contenedor = document.getElementById('contenedor-central');
    if (moduloPaginaActual && contenedor) {
        contenedor.innerHTML = moduloPaginaActual[modo];
    }
    cerrarMenus();
}

const menuTemas = document.getElementById('menu-flotante');
const menuOpciones = document.getElementById('menu-opciones');

document.getElementById('btn-toggle-temas').addEventListener('click', (e) => { e.stopPropagation(); menuOpciones.classList.remove('activo'); menuTemas.classList.toggle('activo'); });
document.getElementById('btn-toggle-opciones').addEventListener('click', (e) => { e.stopPropagation(); menuTemas.classList.remove('activo'); menuOpciones.classList.toggle('activo'); });
document.getElementById('opt-lectura-detallada').addEventListener('click', () => aplicarModoLectura('detallada'));
document.getElementById('opt-lectura-resumida').addEventListener('click', () => aplicarModoLectura('resumida'));
document.getElementById('btn-abrir-sidebar').addEventListener('click', (e) => { e.stopPropagation(); document.body.classList.toggle('sidebar-abierta'); });
document.getElementById('btn-cerrar-sidebar').addEventListener('click', (e) => { e.stopPropagation(); document.body.classList.toggle('sidebar-abierta'); });
document.getElementById('overlay-sidebar').addEventListener('click', () => document.body.classList.remove('sidebar-abierta'));

function cerrarMenus() { menuTemas.classList.remove('activo'); menuOpciones.classList.remove('activo'); }
document.addEventListener('click', cerrarMenus);
menuTemas.addEventListener('click', e => e.stopPropagation());
menuOpciones.addEventListener('click', e => e.stopPropagation());
document.getElementById('btn-restablecer').addEventListener('click', () => { cambiarTema('auto'); aplicarModoLectura('detallada'); cargarPagina(configSitio.paginas[0].id); });
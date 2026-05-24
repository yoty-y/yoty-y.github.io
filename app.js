import { configSitio } from './config.js';

// ==========================================
// 0. DEFINICIÓN DEL WEB COMPONENT <texto-dinamico>
// ==========================================
class TextoDinamico extends HTMLElement {
    connectedCallback() {
        this.renderizar();
        // Escucha el evento global para cambiar cuando se toque el menú
        window.addEventListener('modoLecturaCambiado', () => this.renderizar());
    }

    renderizar() {
        const modo = modoLecturaActual || 'detallada';
        const textoExtenso = this.getAttribute('extenso') || '';
        const textoCorto = this.getAttribute('corto') || '';
        this.innerHTML = modo === 'detallada' ? textoExtenso : textoCorto;
    }
}
// Registramos la etiqueta para que el navegador la reconozca
customElements.define('texto-dinamico', TextoDinamico);


// ESTADO GLOBAL
let temaActual = localStorage.getItem('tema-guardado') || 'auto';
let modoLecturaActual = localStorage.getItem('modo-lectura-guardado') || 'detallada';
let paginaActualId = localStorage.getItem('pagina-actual') || configSitio.paginas[0].id;
let moduloPaginaActual = null;

// ==========================================
// 1. INICIALIZACIÓN DE LA UI
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    construirMenuTemas();
    construirMenuSidebar();
    aplicarModoLectura(modoLecturaActual);
    aplicarTema(temaActual);
    cargarPagina(paginaActualId);
});

// Construir Desplegable de Temas desde config.js
function construirMenuTemas() {
    const contenedor = document.getElementById('menu-flotante');
    
    contenedor.innerHTML = `
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
        let htmlTemas = '';
        cat.temas.forEach(tema => {
            htmlTemas += `
                <div class="item-tema-opcion" data-tema="${tema.id}">
                    <div class="item-flex-izq"><div class="circulo-color" style="background-color: ${tema.color};"></div><span>${tema.icono} ${nombreCorto(tema.nombre)}</span></div>
                    <span class="check-seleccionado">✓</span>
                </div>`;
        });
        
        contenedor.innerHTML += `
            <div class="carpeta-categoria">
                <div class="carpeta-cabecera">
                    <span>${cat.nombre}</span><span class="indicador-flecha">▼</span>
                </div>
                <div class="carpeta-contenido">${htmlTemas}</div>
            </div>`;
    });

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

function nombreCorto(nombre) {
    return nombre.split(' ').slice(1).join(' ');
}

// Construir Sidebar de Páginas
function construirMenuSidebar() {
    const nav = document.getElementById('menu-navegacion-paginas');
    nav.innerHTML = '';
    
    configSitio.paginas.forEach(pagina => {
        const div = document.createElement('div');
        div.className = `opcion-navegacion`;
        div.innerHTML = `
            <button class="btn-interactivo" style="flex-shrink: 0;"><span>${pagina.icono}</span></button>
            <span class="texto-opcion">${pagina.titulo}</span>
        `;
        div.style.color = (pagina.id === paginaActualId) ? 'var(--texto-principal)' : 'inherit';
        
        div.addEventListener('click', () => {
            cargarPagina(pagina.id);
            if(window.innerWidth < 768) document.body.classList.remove('sidebar-abierta');
        });
        nav.appendChild(div);
    });
}

// ==========================================
// 2. MOTOR DE RENDERIZADO DE PÁGINAS (SPA)
// ==========================================
async function cargarPagina(idPagina) {
    const paginaConfig = configSitio.paginas.find(p => p.id === idPagina) || configSitio.paginas[0];
    paginaActualId = paginaConfig.id;
    localStorage.setItem('pagina-actual', paginaActualId);
    
    try {
        moduloPaginaActual = await import(`./paginas/${paginaConfig.archivo}`);
        renderizarContenidoActual();
        
        // Refrescar qué página se ve activa en la barra lateral
        document.querySelectorAll('#menu-navegacion-paginas .opcion-navegacion').forEach((el, index) => {
            if (configSitio.paginas[index].id === idPagina) {
                el.style.color = 'var(--texto-principal)';
                el.querySelector('.btn-interactivo').style.boxShadow = 'inset -1px -1px 3px var(--btn-sombra-clara), inset 1px 1px 3px var(--btn-sombra-oscura)';
            } else {
                el.style.color = 'inherit';
                el.querySelector('.btn-interactivo').style.boxShadow = '-1px -1px 4px var(--btn-sombra-clara), 1px 1px 4px var(--btn-sombra-oscura)';
            }
        });
    } catch (error) {
        document.getElementById('contenedor-central').innerHTML = `<h3>Error cargando: ${paginaConfig.titulo}</h3>`;
        console.error(error);
    }
}

function renderizarContenidoActual() {
    if (!moduloPaginaActual) return;
    const contenedor = document.getElementById('contenedor-central');
    
    // CORRECCIÓN: Soporta páginas con formato antiguo (objeto) o nuevo (string HTML directo)
    if (typeof moduloPaginaActual.contenido === 'string') {
        contenedor.innerHTML = moduloPaginaActual.contenido;
    } else {
        contenedor.innerHTML = moduloPaginaActual.contenido[modoLecturaActual];
    }
    
    if (typeof moduloPaginaActual.inicializar === 'function') {
        moduloPaginaActual.inicializar();
    }
}

// ==========================================
// 3. CONTROL DE TEMAS Y LECTURA
// ==========================================
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
    marcarCheckActivo('#menu-flotante', idTema);
}

function aplicarModoLectura(modo) {
    modoLecturaActual = modo;
    localStorage.setItem('modo-lectura-guardado', modo);
    
    document.body.classList.remove('lectura-detallada', 'lectura-resumida');
    document.body.classList.add(`lectura-${modo}`);
    
    marcarCheckActivo('#menu-opciones', modo);
    
    // CORRECCIÓN: Avisar a los componentes <texto-dinamico> que el modo cambió
    window.dispatchEvent(new CustomEvent('modoLecturaCambiado', { detail: modo }));
    
    // Re-renderizar solo si es el formato antiguo de objeto
    if (moduloPaginaActual && typeof moduloPaginaActual.contenido !== 'string') {
        renderizarContenidoActual();
    }
    cerrarMenus();
}

function marcarCheckActivo(selectorMenu, valorActivo) {
    document.querySelectorAll(`${selectorMenu} .item-tema-opcion`).forEach(el => {
        el.classList.remove('seleccionado');
        if (el.dataset.tema === valorActivo || el.dataset.modo === valorActivo) {
            el.classList.add('seleccionado');
        }
    });
}

// ==========================================
// 4. EVENTOS DE INTERFAZ GENERAL (MENÚS Y TOGGLES)
// ==========================================
const menuTemas = document.getElementById('menu-flotante');
const menuOpciones = document.getElementById('menu-opciones');

document.getElementById('btn-toggle-temas').addEventListener('click', (e) => {
    e.stopPropagation();
    menuOpciones.classList.remove('activo');
    menuTemas.classList.toggle('activo');
});

document.getElementById('btn-toggle-opciones').addEventListener('click', (e) => {
    e.stopPropagation();
    menuTemas.classList.remove('activo');
    menuOpciones.classList.toggle('activo');
});

document.getElementById('opt-lectura-detallada').addEventListener('click', () => aplicarModoLectura('detallada'));
document.getElementById('opt-lectura-resumida').addEventListener('click', () => aplicarModoLectura('resumida'));

document.getElementById('btn-abrir-sidebar').addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.toggle('sidebar-abierta');
});

document.getElementById('btn-cerrar-sidebar').addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.toggle('sidebar-abierta');
});

document.getElementById('overlay-sidebar').addEventListener('click', () => document.body.classList.remove('sidebar-abierta'));

function cerrarMenus() {
    menuTemas.classList.remove('activo');
    menuOpciones.classList.remove('activo');
}
document.addEventListener('click', cerrarMenus);
menuTemas.addEventListener('click', e => e.stopPropagation());
menuOpciones.addEventListener('click', e => e.stopPropagation());

document.getElementById('btn-restablecer').addEventListener('click', () => {
    cambiarTema('auto');
    aplicarModoLectura('detallada');
    cargarPagina(configSitio.paginas[0].id);
});
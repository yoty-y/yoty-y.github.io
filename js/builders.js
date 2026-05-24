// js/builders.js

// ─── Sidebar ──────────────────────────────────────────────────────────────────
export function construirSidebar(config, contenedorId, callbackClic) {
    const nav = document.getElementById(contenedorId);
    if (!nav) return;
    nav.innerHTML = '';

    config.paginas.forEach(pagina => {
        const div = document.createElement('div');
        div.className = 'opcion-navegacion';
        div.setAttribute('data-id', pagina.id);
        div.innerHTML = `
            <button class="btn-interactivo" style="flex-shrink:0;" aria-label="${pagina.titulo}">
                <span>${pagina.icono}</span>
            </button>
            <span class="texto-opcion">${pagina.titulo}</span>
        `;
        div.addEventListener('click', () => callbackClic(pagina.id));
        nav.appendChild(div);
    });
}

// ─── Menú de temas ────────────────────────────────────────────────────────────
export function construirMenuTemas(config, contenedorId, callbackClic) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    // ── Temas básicos sueltos (desde config) ──────────────────────────────────
    let html = '';
    config.temasBasicos.forEach(tema => {
        const borde = tema.borde ? '; border: 1px solid #cbd5e1;' : '';
        html += `
            <div class="item-tema-opcion" data-tema="${tema.id}">
                <div class="item-flex-izq">
                    <div class="circulo-color" style="background-color:${tema.color}${borde}"></div>
                    <span>${tema.icono}&nbsp; ${tema.nombre}</span>
                </div>
                <span class="check-seleccionado">✓</span>
            </div>`;
    });
    html += '<div class="menu-divisor-linea"></div>';

    // ── Categorías en carpetas ────────────────────────────────────────────────
    config.categoriasTemas.forEach(cat => {
        let htmlTemas = '';
        cat.temas.forEach(tema => {
            const borde = tema.borde ? '; border: 1px solid #cbd5e1;' : '';
            htmlTemas += `
                <div class="item-tema-opcion" data-tema="${tema.id}">
                    <div class="item-flex-izq">
                        <div class="circulo-color" style="background-color:${tema.color}${borde}"></div>
                        <span>${tema.icono} ${tema.nombre}</span>
                    </div>
                    <span class="check-seleccionado">✓</span>
                </div>`;
        });

        html += `
            <div class="carpeta-categoria">
                <div class="carpeta-cabecera">
                    <span>${cat.nombre}</span>
                    <span class="indicador-flecha">▼</span>
                </div>
                <div class="carpeta-contenido">${htmlTemas}</div>
            </div>`;
    });

    contenedor.innerHTML = html;

    // Listeners de temas
    contenedor.querySelectorAll('.item-tema-opcion').forEach(item => {
        item.addEventListener('click', () => callbackClic(item.dataset.tema));
    });

    // Acordeón de carpetas
    contenedor.querySelectorAll('.carpeta-cabecera').forEach(cabecera => {
        cabecera.addEventListener('click', e => {
            e.stopPropagation();
            const carpeta = cabecera.parentElement;
            const estaAbierta = carpeta.classList.contains('abierta');
            contenedor.querySelectorAll('.carpeta-categoria').forEach(c => c.classList.remove('abierta'));
            if (!estaAbierta) carpeta.classList.add('abierta');
        });
    });
}
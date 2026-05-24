// js/builders.js
export function construirSidebar(config, contenedorId, callbackClic) {
    const nav = document.getElementById(contenedorId);
    nav.innerHTML = '';
    
    config.paginas.forEach(pagina => {
        const div = document.createElement('div');
        div.className = `opcion-navegacion`;
        div.setAttribute('data-id', pagina.id);
        div.innerHTML = `
            <button class="btn-interactivo" style="flex-shrink: 0;"><span>${pagina.icono}</span></button>
            <span class="texto-opcion">${pagina.titulo}</span>
        `;
        div.addEventListener('click', () => callbackClic(pagina.id));
        nav.appendChild(div);
    });
}

export function construirMenuTemas(config, contenedorId, callbackClic) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = '';

    config.categoriasTemas.forEach(cat => {
        let htmlTemas = '';
        cat.temas.forEach(tema => {
            htmlTemas += `
                <div class="item-tema-opcion" data-tema="${tema.id}">
                    <div class="item-flex-izq">
                        <div class="circulo-color" style="background-color: ${tema.color}; border: 1px solid #cbd5e1;"></div>
                        <span>${tema.icono} ${tema.nombre}</span>
                    </div>
                    <span class="check-seleccionado">✓</span>
                </div>`;
        });
        
        contenedor.innerHTML += `
            <div class="carpeta-categoria">
                <div class="carpeta-cabecera"><span>${cat.nombre}</span><span class="indicador-flecha">▼</span></div>
                <div class="carpeta-contenido">${htmlTemas}</div>
            </div>`;
    });

    document.querySelectorAll(`#${contenedorId} .item-tema-opcion`).forEach(item => {
        item.addEventListener('click', () => callbackClic(item.dataset.tema));
    });
}
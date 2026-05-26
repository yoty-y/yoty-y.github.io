// js/builders.js

// ─── Sidebar (árbol recursivo con sub-items desplegables) ─────────────────────
//
// Regla de renderizado:
//   • sidebar: false  → omitir en el sidebar (pero sí existe en configSitio.paginas)
//   • hijos: [...]    → agregar triángulo desplegable. El triángulo dispara el
//                       acordeón; el icono y el texto de la página navegan normalmente.
//   • Recursivo       → soporta nietos, bisnietos, etc., con indentación automática.

export function construirSidebar(config, contenedorId, callbackClic) {
    const nav = document.getElementById(contenedorId);
    if (!nav) return;
    nav.innerHTML = '';
    _renderNivel(config.paginas, nav, callbackClic, 0);
}

function _renderNivel(paginas, contenedor, callbackClic, nivel) {
    paginas.forEach(pagina => {
        // Páginas con sidebar: false no se muestran
        if (pagina.sidebar === false) return;

        const tieneHijos = Array.isArray(pagina.hijos) && pagina.hijos.length > 0;

        // ── Wrapper que agrupa el item + su sub-lista ─────────────────────────
        const wrapper = document.createElement('div');
        wrapper.className = 'nav-wrapper';
        if (nivel > 0) wrapper.style.paddingLeft = `${nivel * 14}px`;

        // ── Fila del item ──────────────────────────────────────────────────────
        const fila = document.createElement('div');
        fila.className = 'opcion-navegacion';
        fila.setAttribute('data-id', pagina.id);

        // Icono/btn (navega)
        const btn = document.createElement('button');
        btn.className = 'btn-interactivo';
        btn.style.flexShrink = '0';
        btn.setAttribute('aria-label', pagina.titulo);
        btn.innerHTML = `<span>${pagina.icono}</span>`;
        btn.addEventListener('click', e => {
            e.stopPropagation();
            callbackClic(pagina.id);
        });

        // Texto (navega)
        const textoEl = document.createElement('span');
        textoEl.className = 'texto-opcion';
        textoEl.textContent = pagina.titulo;
        textoEl.style.flex = '1';
        textoEl.addEventListener('click', e => {
            e.stopPropagation();
            callbackClic(pagina.id);
        });

        fila.appendChild(btn);
        fila.appendChild(textoEl);

        // ── Triángulo (solo si hay hijos) ──────────────────────────────────────
        if (tieneHijos) {
            const tri = document.createElement('button');
            tri.className = 'btn-nav-triangulo';
            tri.setAttribute('aria-label', 'Desplegar sub-páginas');
            tri.innerHTML = `<span class="nav-tri-icono">▶</span>`;

            tri.addEventListener('click', e => {
                e.stopPropagation();
                const abierto = wrapper.classList.toggle('nav-desplegado');
                tri.setAttribute('aria-expanded', String(abierto));
                _guardarDesplegados();
            });

            fila.appendChild(tri);
        }

        wrapper.appendChild(fila);

        // ── Sub-lista recursiva ────────────────────────────────────────────────
        if (tieneHijos) {
            const sublista = document.createElement('div');
            sublista.className = 'nav-sublista';
            _renderNivel(pagina.hijos, sublista, callbackClic, nivel + 1);
            wrapper.appendChild(sublista);
        }

        contenedor.appendChild(wrapper);
    });
}

// ─── Menú de temas ────────────────────────────────────────────────────────────
export function construirMenuTemas(config, contenedorId, callbackClic) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    // ── Temas básicos sueltos ─────────────────────────────────────────────────
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

    // ── Categorías ────────────────────────────────────────────────────────────
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

    contenedor.querySelectorAll('.item-tema-opcion').forEach(item => {
        item.addEventListener('click', () => callbackClic(item.dataset.tema));
    });

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

// ─── Persistencia de desplegables ─────────────────────────────────────────────
// Guarda un array con los ids de los nav-wrapper que tienen nav-desplegado.

function _guardarDesplegados() {
    const abiertos = [...document.querySelectorAll('.nav-wrapper.nav-desplegado')]
        .map(w => w.querySelector('.opcion-navegacion')?.dataset?.id)
        .filter(Boolean);
    localStorage.setItem('nav-desplegados', JSON.stringify(abiertos));
}

// Llamada desde app.js después de construirSidebar()
export function restaurarDesplegados() {
    try {
        const abiertos = JSON.parse(localStorage.getItem('nav-desplegados') || '[]');
        abiertos.forEach(id => {
            const fila = document.querySelector(`.opcion-navegacion[data-id="${id}"]`);
            if (fila) {
                const wrapper = fila.closest('.nav-wrapper');
                if (wrapper) {
                    wrapper.classList.add('nav-desplegado');
                    const tri = wrapper.querySelector('.btn-nav-triangulo');
                    if (tri) tri.setAttribute('aria-expanded', 'true');
                }
            }
        });
    } catch (_) {}
}
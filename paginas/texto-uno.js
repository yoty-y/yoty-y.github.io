// paginas/texto-uno.js
export const contenido = `
    <div class="bloque-lectura">
        <span class="badge">✦ Demo</span>

        <h3 class="titulo-contenido" style="margin-top: 18px;">
            Sub-página Demostrativa
        </h3>

        <texto-dinamico
            extenso="Aquí puedes poner párrafos enteros, imágenes, e incluso tablas largas para el modo de lectura enfocado. Este modo está pensado para quien quiere absorber cada detalle."
            corto="Un resumen súper rápido para el que tiene prisa.">
        </texto-dinamico>

        <div class="separador-deco" style="margin: 28px 0;">paleta de componentes</div>

        <div class="demo-chips">
            <span class="chip chip-verde">✅ Activo</span>
            <span class="chip chip-naranja">⚠️ Pendiente</span>
            <span class="chip chip-azul">ℹ️ Info</span>
            <span class="chip chip-rojo">❌ Error</span>
        </div>

        <div class="separador-deco" style="margin: 28px 0;">línea del tiempo</div>

        <div class="timeline">
            <div class="tl-item">
                <div class="tl-dot"></div>
                <div class="tl-body">
                    <strong>v1.0 · HTML estático</strong>
                    <texto-dinamico
                        extenso="<p class='tl-desc txt-detallado'>La primera versión era un simple archivo HTML sin lógica dinámica. Funcional, pero difícil de mantener a medida que crecía.</p>"
                        corto="<p class='tl-desc txt-resumido'>HTML puro. Simple pero no escalable.</p>">
                    </texto-dinamico>
                </div>
            </div>
            <div class="tl-item">
                <div class="tl-dot"></div>
                <div class="tl-body">
                    <strong>v2.0 · Módulos JS</strong>
                    <texto-dinamico
                        extenso="<p class='tl-desc txt-detallado'>Se introdujeron módulos ES y un sistema de temas. La arquitectura mejoró notablemente, pero el sidebar seguía siendo manual.</p>"
                        corto="<p class='tl-desc txt-resumido'>Módulos ES + temas. Gran salto.</p>">
                    </texto-dinamico>
                </div>
            </div>
            <div class="tl-item tl-activo">
                <div class="tl-dot"></div>
                <div class="tl-body">
                    <strong>v3.0 · SPA modular ← aquí</strong>
                    <texto-dinamico
                        extenso="<p class='tl-desc txt-detallado'>Web Components, navegación SPA, sub-páginas jerárquicas y páginas secretas. El sistema ahora se expande sin tocar HTML.</p>"
                        corto="<p class='tl-desc txt-resumido'>SPA + jerarquía + secretos. ⚡</p>">
                    </texto-dinamico>
                </div>
            </div>
        </div>

        <div class="separador-deco" style="margin: 28px 0;">sincronía</div>

        <texto-dinamico
            extenso="Incluso puedes tener múltiples bloques <strong>texto-dinamico</strong> separados en la misma página, y todos cambiarán al mismo tiempo cuando el usuario alterne el modo de lectura desde el menú."
            corto="Todo cambia en sincronía perfecta. Sin recargar, sin saltos.">
        </texto-dinamico>

        <div class="bloque-acento" style="margin-top: 18px;">
            <texto-dinamico
                extenso="Este bloque con borde lateral es ideal para citas, notas importantes o llamadas de atención dentro del contenido."
                corto="Úsalo para destacar lo que importa.">
            </texto-dinamico>
        </div>

        <button class="btn-ir-secreto" id="btn-secreto-texto-uno" style="margin-top: 24px;">
            🔒 Acceder a la Página Secreta
        </button>
    </div>
`;

export function inicializar() {
    const btn = document.getElementById('btn-secreto-texto-uno');
    if (btn) {
        btn.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navegarA', { detail: 'secreto' }));
        });
    }
}
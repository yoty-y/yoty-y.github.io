// paginas/inicio.js
export const contenido = `
    <div class="bloque-lectura">
        <span class="badge">✦ Inicio</span>

        <h3 class="titulo-contenido" style="margin-top: 18px;">
            Bienvenido a<br>mi espacio web
        </h3>

        <p class="parrafo-contenido">
            Este es un texto fijo. Nunca cambia sin importar el modo en el que estés.
            Sirve de ancla entre lo estático y lo dinámico.
        </p>

        <div class="separador-deco">sobre este sitio</div>

        <texto-dinamico
            extenso="
                <h4>🚀 El Futuro del Desarrollo Web</h4>
                <div class='txt-detallado'>
                    El diseño web moderno ha evolucionado hacia arquitecturas sumamente dinámicas.
                    Usar Web Components como este nos permite tener un código extremadamente limpio
                    y reutilizable. Cada pieza vive en su propio módulo, y expandir el sitio es
                    tan sencillo como soltar un archivo nuevo en la carpeta <code style='font-family: var(--font-mono); background: var(--btn-bg); padding: 2px 6px; border-radius: 4px; font-size: 0.85rem;'>paginas/</code>.
                </div>
            "
            corto="
                <h4>🚀 Desarrollo Web Modular</h4>
                <div class='txt-resumido'>
                    Agrega páginas soltando archivos en <code style='font-family: var(--font-mono); background: var(--btn-bg); padding: 2px 6px; border-radius: 4px; font-size: 0.85rem;'>paginas/</code>. Estructura lista, solo escribe contenido. ⚡
                </div>
            ">
        </texto-dinamico>

        <div class="separador-deco">estadísticas del universo</div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-numero" data-target="93">0</div>
                <div class="stat-label">Mil millones de años</div>
                <div class="stat-desc">edad del universo</div>
            </div>
            <div class="stat-card">
                <div class="stat-numero" data-target="200">0</div>
                <div class="stat-label">Mil millones de galaxias</div>
                <div class="stat-desc">observable</div>
            </div>
            <div class="stat-card">
                <div class="stat-numero" data-target="7">0</div>
                <div class="stat-label">Continentes</div>
                <div class="stat-desc">en la Tierra</div>
            </div>
            <div class="stat-card">
                <div class="stat-numero" data-target="118">0</div>
                <div class="stat-label">Elementos</div>
                <div class="stat-desc">tabla periódica</div>
            </div>
        </div>

        <div class="separador-deco">explorar</div>

        <div class="bloque-acento" style="margin-top: 24px;">
            <texto-dinamico
                extenso="La simplicidad no está reñida con la elegancia — este sistema fue diseñado para crecer sin volverse complicado. Despliega el ítem <strong>Inicio</strong> en el menú lateral para ver la sub-sección Explorador."
                corto="Simple de expandir, elegante por diseño. Toca ▶ en Inicio para ver sub-páginas.">
            </texto-dinamico>
        </div>

        <button class="btn-ir-secreto" id="btn-desde-inicio" style="margin-top: 20px;">
            🔒 Acceder a la Página Secreta
        </button>
    </div>
`;

export function inicializar() {
    // Animación contadora
    document.querySelectorAll('.stat-numero').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current >= target) clearInterval(timer);
        }, 30);
    });

    // Botón secreto
    const btn = document.getElementById('btn-desde-inicio');
    if (btn) {
        btn.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navegarA', { detail: 'secreto' }));
        });
    }
}
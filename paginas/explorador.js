// paginas/explorador.js

const estilos = `
<style>
    .concepto-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin: 4px 0 8px;
    }
    .concepto-card {
        background: var(--bg-principal);
        border: 1px solid var(--borde-color);
        border-radius: 12px;
        padding: 14px 14px 12px;
        transition: transform 0.2s, box-shadow 0.2s, var(--transicion-tema);
        font-size: 0.87rem;
        color: var(--texto-principal);
    }
    .concepto-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px var(--sombra-general);
    }
    .concepto-icono {
        font-size: 1.4rem;
        margin-bottom: 8px;
    }
    .concepto-texto {
        margin-top: 4px;
        font-size: 0.82rem;
    }
    .curiosidad-bar-wrap {
        margin: 8px 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .curiosidad-label {
        display: flex;
        justify-content: space-between;
        font-size: 0.84rem;
        color: var(--texto-secundario);
        font-family: var(--font-mono);
    }
    .curiosidad-track {
        height: 10px;
        background: var(--btn-bg);
        border-radius: 100px;
        border: 1px solid var(--borde-color);
        overflow: hidden;
    }
    .curiosidad-fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, var(--accent-color), color-mix(in srgb, var(--accent-color) 60%, #ffffff));
        border-radius: 100px;
        transition: width 0.4s cubic-bezier(0.34,1.56,0.64,1);
    }
    .btn-curiosidad {
        align-self: flex-start;
        background: var(--btn-bg);
        border: 1px solid var(--borde-color);
        color: var(--texto-principal);
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 0.85rem;
        font-family: var(--font-body);
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease, var(--transicion-tema);
        box-shadow: -1px -1px 3px var(--btn-sombra-clara), 1px 1px 3px var(--btn-sombra-oscura);
    }
    .btn-curiosidad:hover { transform: translateY(-2px); }
    .btn-curiosidad:active { transform: scale(0.97); }
</style>`;

export const contenido = estilos + `
    <div class="bloque-lectura">
        <span class="badge">✦ Explorador</span>

        <h3 class="titulo-contenido" style="margin-top: 18px;">
            Explorador<br>de Conceptos
        </h3>

        <texto-dinamico
            extenso="
                <p class='txt-detallado'>
                    Esta es una sub-página hija de Inicio. Aparece desplegada en el sidebar
                    solo cuando presionas el triángulo ▶ junto al ítem padre. El código es
                    idéntico a cualquier otra página — solo su posición en <code style='font-family:var(--font-mono);background:var(--btn-bg);padding:2px 6px;border-radius:4px;font-size:0.85rem;'>config.js</code> la hace hija.
                </p>
            "
            corto="<p class='txt-resumido'>Sub-página de Inicio. Solo config.js la distingue.</p>">
        </texto-dinamico>

        <div class="separador-deco">tarjetas de concepto</div>

        <div class="concepto-grid">
            <div class="concepto-card">
                <div class="concepto-icono">🧩</div>
                <texto-dinamico
                    extenso="<strong>Modularidad</strong><p class='txt-detallado concepto-texto'>Cada página es un archivo JS independiente. No hay dependencias cruzadas entre contenidos.</p>"
                    corto="<strong>Modularidad</strong><p class='txt-resumido concepto-texto'>Archivos JS independientes.</p>">
                </texto-dinamico>
            </div>
            <div class="concepto-card">
                <div class="concepto-icono">🌲</div>
                <texto-dinamico
                    extenso="<strong>Jerarquía</strong><p class='txt-detallado concepto-texto'>Las páginas pueden tener hijos, nietos y más, definidos con el campo <em>hijos</em> en config.js.</p>"
                    corto="<strong>Jerarquía</strong><p class='txt-resumido concepto-texto'>Hijos y nietos en config.js.</p>">
                </texto-dinamico>
            </div>
            <div class="concepto-card">
                <div class="concepto-icono">🔒</div>
                <texto-dinamico
                    extenso="<strong>Páginas ocultas</strong><p class='txt-detallado concepto-texto'>Con <em>sidebar: false</em> una página existe pero no aparece en el menú lateral. Solo accesible por botón o link explícito.</p>"
                    corto="<strong>Páginas ocultas</strong><p class='txt-resumido concepto-texto'>sidebar: false las esconde del menú.</p>">
                </texto-dinamico>
            </div>
            <div class="concepto-card">
                <div class="concepto-icono">⚡</div>
                <texto-dinamico
                    extenso="<strong>Sin recargas</strong><p class='txt-detallado concepto-texto'>La navegación es 100 % SPA: los módulos se importan dinámicamente, nunca se recarga la página.</p>"
                    corto="<strong>Sin recargas</strong><p class='txt-resumido concepto-texto'>Importación dinámica pura.</p>">
                </texto-dinamico>
            </div>
        </div>

        <div class="separador-deco">medidor de curiosidad</div>

        <div class="curiosidad-bar-wrap">
            <div class="curiosidad-label">
                <span>Tu nivel de curiosidad</span>
                <span id="curiosidad-val">0%</span>
            </div>
            <div class="curiosidad-track">
                <div class="curiosidad-fill" id="curiosidad-fill"></div>
            </div>
            <button class="btn-curiosidad" id="btn-mas-curiosidad">
                +10 curiosidad
            </button>
        </div>

        <div class="bloque-acento" style="margin-top: 24px;">
            <texto-dinamico
                extenso="Esta sub-página fue creada añadiendo un objeto en el array <em>hijos</em> de la página 'inicio' en config.js. El sidebar se reconstruye solo. No se tocó ni una línea de HTML."
                corto="Solo se editó config.js. El sidebar se actualizó solo.">
            </texto-dinamico>
        </div>

        <button class="btn-ir-secreto" id="btn-secreto-explorador" style="margin-top: 20px;">
            🔒 Acceder a la Página Secreta
        </button>
    </div>
`;

export function inicializar() {
    let nivel = parseInt(localStorage.getItem('explorador-curiosidad') || '0', 10);

    const fill = document.getElementById('curiosidad-fill');
    const val  = document.getElementById('curiosidad-val');
    const btn  = document.getElementById('btn-mas-curiosidad');

    if (btn && fill && val) {
        fill.style.width = nivel + '%';
        val.textContent  = nivel + '%';
        if (nivel === 100) btn.textContent = '🎉 ¡Máxima curiosidad!';

        btn.addEventListener('click', () => {
            nivel = Math.min(nivel + 10, 100);
            fill.style.width = nivel + '%';
            val.textContent  = nivel + '%';
            localStorage.setItem('explorador-curiosidad', nivel);
            if (nivel === 100) btn.textContent = '🎉 ¡Máxima curiosidad!';
        });
    }

    const btnSecreto = document.getElementById('btn-secreto-explorador');
    if (btnSecreto) {
        btnSecreto.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navegarA', { detail: 'secreto' }));
        });
    }
}
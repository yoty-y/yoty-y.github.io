// paginas/secreto.js
// sidebar: false en config.js — no aparece en el menú lateral.
// Solo accesible mediante el evento 'navegarA' disparado por botones en otras páginas.

export const contenido = `
    <div class="bloque-lectura secreto-pagina">
        <span class="badge" style="background:color-mix(in srgb,#f59e0b 15%,transparent);color:#f59e0b;border-color:color-mix(in srgb,#f59e0b 30%,transparent);">
            🔒 Restringido
        </span>

        <h3 class="titulo-contenido" style="margin-top: 18px;">
            Área<br>Secreta
        </h3>

        <texto-dinamico
            extenso="
                <p class='txt-detallado'>
                    Esta página existe en <code style='font-family:var(--font-mono);background:var(--btn-bg);padding:2px 6px;border-radius:4px;font-size:0.85rem;'>config.js</code> con la propiedad
                    <code style='font-family:var(--font-mono);background:var(--btn-bg);padding:2px 6px;border-radius:4px;font-size:0.85rem;'>sidebar: false</code>.
                    El sistema la registra, puede navegarla y cargarla, pero el constructor del sidebar
                    la omite automáticamente. El único acceso es a través de botones explícitos en otras páginas.
                </p>
            "
            corto="<p class='txt-resumido'>sidebar: false → existe pero el menú la ignora. Acceso solo por botón.</p>">
        </texto-dinamico>

        <div class="separador-deco">códigos de acceso</div>

        <div class="secreto-teclado" id="teclado-secreto">
            <div class="secreto-display" id="secreto-display">_ _ _ _</div>
            <div class="secreto-numpad">
                <button class="secreto-btn" data-n="1">1</button>
                <button class="secreto-btn" data-n="2">2</button>
                <button class="secreto-btn" data-n="3">3</button>
                <button class="secreto-btn" data-n="4">4</button>
                <button class="secreto-btn" data-n="5">5</button>
                <button class="secreto-btn" data-n="6">6</button>
                <button class="secreto-btn" data-n="7">7</button>
                <button class="secreto-btn" data-n="8">8</button>
                <button class="secreto-btn" data-n="9">9</button>
                <button class="secreto-btn secreto-btn-clear">⌫</button>
                <button class="secreto-btn" data-n="0">0</button>
                <button class="secreto-btn secreto-btn-ok">OK</button>
            </div>
            <p class="secreto-hint" id="secreto-hint">Ingresa el código de 4 dígitos</p>
        </div>

        <div class="separador-deco">ficha técnica</div>

        <div class="ficha-tabla">
            <div class="ficha-fila">
                <span class="ficha-clave">Ruta de acceso</span>
                <span class="ficha-valor">Evento <code style='font-family:var(--font-mono)'>navegarA</code></span>
            </div>
            <div class="ficha-fila">
                <span class="ficha-clave">En sidebar</span>
                <span class="ficha-valor chip chip-rojo" style="font-size:0.75rem;">No</span>
            </div>
            <div class="ficha-fila">
                <span class="ficha-clave">Código secreto</span>
                <texto-dinamico
                    extenso="<span class='ficha-valor txt-detallado'>Hay una pista oculta en el código fuente de esta página… 👀</span>"
                    corto="<span class='ficha-valor txt-resumido'>Busca en el JS.</span>">
                </texto-dinamico>
            </div>
        </div>

        <div class="bloque-acento" style="margin-top: 20px;">
            <texto-dinamico
                extenso="Para agregar más páginas ocultas a futuro, solo añade un objeto con <em>sidebar: false</em> en config.js y crea su archivo en <em>paginas/</em>. Cero cambios en el HTML o en builders.js."
                corto="Más páginas ocultas: sidebar: false en config.js. Sin más cambios.">
            </texto-dinamico>
        </div>
    </div>
`;

const CODIGO_CORRECTO = '7742'; // 👀

export function inicializar() {
    let entrada = '';

    const display = document.getElementById('secreto-display');
    const hint    = document.getElementById('secreto-hint');

    function actualizarDisplay() {
        const mostrar = entrada.padEnd(4, '_').split('').join(' ');
        if (display) display.textContent = mostrar;
    }

    document.querySelectorAll('.secreto-btn[data-n]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (entrada.length < 4) {
                entrada += btn.dataset.n;
                actualizarDisplay();
            }
        });
    });

    const btnClear = document.querySelector('.secreto-btn-clear');
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            entrada = entrada.slice(0, -1);
            actualizarDisplay();
            if (hint) hint.textContent = 'Ingresa el código de 4 dígitos';
            if (display) display.style.color = '';
        });
    }

    const btnOk = document.querySelector('.secreto-btn-ok');
    if (btnOk) {
        btnOk.addEventListener('click', () => {
            if (entrada === CODIGO_CORRECTO) {
                if (hint) { hint.textContent = '✅ ¡Acceso concedido! Bienvenido al nivel oculto.'; hint.style.color = 'var(--check-color)'; }
                if (display) display.style.color = 'var(--check-color)';
            } else {
                if (hint) { hint.textContent = '❌ Código incorrecto. Intenta de nuevo.'; hint.style.color = '#ef4444'; }
                if (display) display.style.color = '#ef4444';
                entrada = '';
                setTimeout(() => { actualizarDisplay(); if (display) display.style.color = ''; if (hint) hint.style.color = ''; if (hint) hint.textContent = 'Ingresa el código de 4 dígitos'; }, 1200);
            }
        });
    }
}
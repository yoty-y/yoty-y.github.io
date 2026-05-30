// temas/secretos/huevo-de-pascua.js
// ─────────────────────────────────────────────────────────────────────────────
// Tema secreto autónomo. Contiene:
//   - El objeto del tema con su CSS
//   - La llave de almacén (STORAGE_KEY) compartida con temas.js
//   - La función de desbloqueo que escribe en localStorage y avisa al layout
//   - El HTML del botón listo para plantar en cualquier página
//
// PARA PLANTAR EL BOTÓN EN UNA PÁGINA:
//   import { htmlBoton, inicializarBoton } from '../temas/secretos/huevo-de-pascua.js';
//   // En el contenido: ${htmlBoton}
//   // En inicializar(): inicializarBoton();
// ─────────────────────────────────────────────────────────────────────────────

const ID             = 'huevo-de-pascua';
const CODIGO_SECRETO = '2024';             // ← cambia esto para personalizar
export const STORAGE_KEY = 'temas-secretos-desbloqueados';  // compartida con temas.js

// ── Objeto del tema ───────────────────────────────────────────────────────────
export const tema = {
    id:     ID,
    nombre: "Huevo de Pascua",
    icono:  "🥚",
    color:  "#f9a8d4",
    borde:  false,
    css: `body.tema-huevo-de-pascua{
        --bg-principal:#fdf4ff;
        --bg-tarjetas:#fff0fb;
        --bg-sidebar:#fce7f3;
        --texto-principal:#6b21a8;
        --texto-secundario:#a855f7;
        --borde-color:#e9d5ff;
        --btn-bg:#f3e8ff;
        --btn-sombra-oscura:rgba(107,33,168,.12);
        --btn-sombra-clara:rgba(255,255,255,.95);
        --icono-sumido:rgba(168,85,247,.08);
        --sombra-general:rgba(107,33,168,.06);
        --accent-color:#a855f7;
        --check-color:#10b981
    }`
};

// ── Desbloqueo ────────────────────────────────────────────────────────────────
export function estaDesbloqueado() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').includes(ID);
    } catch (_) { return false; }
}

export function desbloquear() {
    if (estaDesbloqueado()) return;
    try {
        const lista = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        lista.push(ID);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
        // Avisa al layout para que regenere el menú de temas
        window.dispatchEvent(new CustomEvent('temaSecretoDesbloqueado', { detail: ID }));
    } catch (_) {}
}

// ── Botón plantable ───────────────────────────────────────────────────────────
export const htmlBoton = `
<div id="bloque-huevo-pascua" style="margin-top:20px;">
    <div id="huevo-display" style="
        display:flex; align-items:center; gap:10px;
        background:var(--btn-bg);
        border:1px solid var(--borde-color);
        border-radius:12px; padding:12px 16px;
        font-size:.85rem; color:var(--texto-secundario);
        font-family:var(--font-mono);
    ">
        <span style="font-size:1.2rem">🥚</span>
        <input id="huevo-input" type="password" placeholder="código secreto..."
            maxlength="10" autocomplete="off" style="
            background:none; border:none; outline:none;
            font-family:var(--font-mono); font-size:.85rem;
            color:var(--texto-principal); flex:1; min-width:0;
        "/>
        <button id="huevo-btn" style="
            background:none; border:none; cursor:pointer;
            font-size:1rem; padding:0; color:var(--accent-color);
        ">→</button>
    </div>
    <p id="huevo-hint" style="
        font-size:.75rem; color:var(--texto-secundario);
        font-family:var(--font-mono); margin-top:6px;
        opacity:.6; transition:opacity .3s;
    ">¿Hay algo escondido aquí?</p>
</div>`;

export function inicializarBoton() {
    const bloque = document.getElementById('bloque-huevo-pascua');
    if (!bloque) return;

    // Si ya está desbloqueado, mostrar estado ganado
    if (estaDesbloqueado()) {
        _mostrarDesbloqueado();
        return;
    }

    const input = document.getElementById('huevo-input');
    const btn   = document.getElementById('huevo-btn');
    const hint  = document.getElementById('huevo-hint');

    function intentar() {
        if (input.value === CODIGO_SECRETO) {
            desbloquear();
            _mostrarDesbloqueado();
        } else {
            hint.textContent = '❌ No es eso...';
            hint.style.color = '#ef4444';
            hint.style.opacity = '1';
            input.value = '';
            setTimeout(() => {
                hint.textContent = '¿Hay algo escondido aquí?';
                hint.style.color = '';
                hint.style.opacity = '.6';
            }, 1500);
        }
    }

    btn.addEventListener('click', intentar);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') intentar(); });
}

function _mostrarDesbloqueado() {
    const bloque = document.getElementById('bloque-huevo-pascua');
    if (!bloque) return;
    bloque.innerHTML = `
        <div style="
            display:flex; align-items:center; gap:10px;
            background:var(--btn-bg);
            border:1px solid var(--borde-color);
            border-radius:12px; padding:12px 16px;
            font-size:.85rem; color:var(--check-color);
            font-family:var(--font-mono);
        ">
            <span style="font-size:1.2rem">🥚</span>
            <span>¡Tema desbloqueado! Búscalo en el menú de temas.</span>
        </div>`;
}
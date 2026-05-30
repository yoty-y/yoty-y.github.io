// temas.js — Registro completo de temas
// ─────────────────────────────────────────────────────────────────────────────
// ESTRUCTURA DE CADA TEMA
//   id     : string único, sin espacios. core.js añade body.tema-{id}
//   nombre : texto visible en el menú
//   icono  : emoji o carácter que aparece en el botón y en el menú
//   color  : color del círculo de muestra en el menú
//   css    : bloque CSS completo como string. null = usa :root de estilos.css
//   borde  : (opcional) true añade borde al círculo de muestra
//
// VARIABLES CSS DISPONIBLES EN CADA TEMA (todas deben estar presentes):
//   --bg-principal --bg-tarjetas --bg-sidebar
//   --texto-principal --texto-secundario --borde-color
//   --btn-bg --btn-sombra-oscura --btn-sombra-clara
//   --icono-sumido --sombra-general --accent-color --check-color
//
// PARA AGREGAR UNA CATEGORÍA:
//   1. Añade un objeto a categoriasTemas con nombre y array temas[]
//   2. Listo — builders.js lo renderiza automáticamente
//
// PARA AGREGAR UN TEMA BÁSICO (ciclo del botón izquierdo):
//   Añade a temasBasicos[]. Los primeros 3 forman el ciclo de rotación en app.js
// ─────────────────────────────────────────────────────────────────────────────

export const temasBasicos = [
    { id: "auto",  nombre: "Automático", icono: "A",  color: "#a1a1aa", css: null },
    { id: "light", nombre: "Claro",      icono: "☼", color: "#ffffff", css: null, borde: true },
    { id: "dark",  nombre: "Oscuro",     icono: "☽", color: "#1e1e1e", css: null }
];

export const categoriasTemas = [
    {
        nombre: "🌡️ TONOS CÁLIDOS",
        temas: [
            { id: "retro",    nombre: "Retro Rosado",     icono: "🌸", color: "#bc4749",
              css: `body.tema-retro{--bg-principal:#f5ebe0;--bg-tarjetas:#f2e8cf;--bg-sidebar:#e6ccb2;--texto-principal:#6b2d5c;--texto-secundario:#bc4749;--borde-color:#ddb892;--btn-bg:#ede0d4;--btn-sombra-oscura:rgba(107,45,92,.15);--btn-sombra-clara:rgba(255,255,255,.9);--icono-sumido:rgba(0,0,0,.08);--sombra-general:rgba(107,45,92,.05);--accent-color:#bc4749;--check-color:#5a9a6f}` },
            { id: "desierto", nombre: "Desierto Arena",   icono: "🏜️", color: "#b4846c",
              css: `body.tema-desierto{--bg-principal:#dfd3c3;--bg-tarjetas:#f4eee5;--bg-sidebar:#c7b198;--texto-principal:#7d5a50;--texto-secundario:#b4846c;--borde-color:#c7b198;--btn-bg:#f4eee5;--btn-sombra-oscura:rgba(125,90,80,.15);--btn-sombra-clara:rgba(255,255,255,.8);--icono-sumido:rgba(0,0,0,.05);--sombra-general:rgba(0,0,0,.03);--accent-color:#b4846c;--check-color:#5a9a6f}` },
            { id: "amanecer", nombre: "Amanecer Suave",   icono: "🌅", color: "#e07b54",
              css: `body.tema-amanecer{--bg-principal:#fef3ec;--bg-tarjetas:#fff8f3;--bg-sidebar:#fde8d8;--texto-principal:#7c2d12;--texto-secundario:#c2410c;--borde-color:#fdba74;--btn-bg:#fde8d8;--btn-sombra-oscura:rgba(124,45,18,.12);--btn-sombra-clara:rgba(255,255,255,.9);--icono-sumido:rgba(0,0,0,.06);--sombra-general:rgba(194,65,12,.08);--accent-color:#ea580c;--check-color:#15803d}` },
            { id: "cafe",     nombre: "Café Oscuro",      icono: "☕", color: "#6f4e37",
              css: `body.tema-cafe{--bg-principal:#2c1a0e;--bg-tarjetas:#3b2314;--bg-sidebar:#1e1009;--texto-principal:#e8d5b7;--texto-secundario:#b59a78;--borde-color:#5c3d22;--btn-bg:#4a2e18;--btn-sombra-oscura:rgba(0,0,0,.5);--btn-sombra-clara:rgba(232,213,183,.08);--icono-sumido:rgba(0,0,0,.25);--sombra-general:rgba(0,0,0,.35);--accent-color:#d97706;--check-color:#6dbf85}` },
            { id: "brasa",    nombre: "Brasa Naranja",    icono: "🔥", color: "#ff4d00",
              css: `body.tema-brasa{--bg-principal:#0f0f12;--bg-tarjetas:#18181c;--bg-sidebar:#241414;--texto-principal:#ff4d00;--texto-secundario:#ff9e00;--borde-color:#ff3c00;--btn-bg:#212126;--btn-sombra-oscura:rgba(0,0,0,.6);--btn-sombra-clara:rgba(255,77,0,.05);--icono-sumido:rgba(255,77,0,.2);--sombra-general:rgba(0,0,0,.5);--accent-color:#ff9e00;--check-color:#ff4d00}` }
        ]
    },
    {
        nombre: "🧊 TONOS FRÍOS",
        temas: [
            { id: "oceano",   nombre: "Océano Profundo",  icono: "🌊", color: "#06b6d4",
              css: `body.tema-oceano{--bg-principal:#030712;--bg-tarjetas:#111827;--bg-sidebar:#0f172a;--texto-principal:#06b6d4;--texto-secundario:#38bdf8;--borde-color:#1e293b;--btn-bg:#1f2937;--btn-sombra-oscura:rgba(0,0,0,.7);--btn-sombra-clara:rgba(6,182,212,.1);--icono-sumido:rgba(6,182,212,.25);--sombra-general:rgba(6,182,212,.08);--accent-color:#06b6d4;--check-color:#38bdf8}` },
            { id: "artico",   nombre: "Ártico Azul",      icono: "❄️", color: "#3f72af",
              css: `body.tema-artico{--bg-principal:#eef2f7;--bg-tarjetas:#ffffff;--bg-sidebar:#dbe2ef;--texto-principal:#3f72af;--texto-secundario:#112d4e;--borde-color:#dbe2ef;--btn-bg:#f9f7f7;--btn-sombra-oscura:rgba(63,114,175,.15);--btn-sombra-clara:rgba(255,255,255,.9);--icono-sumido:rgba(0,0,0,.05);--sombra-general:rgba(0,0,0,.02);--accent-color:#3f72af;--check-color:#5a9a6f}` },
            { id: "aurora",   nombre: "Aurora Boreal",    icono: "🌌", color: "#a855f7",
              css: `body.tema-aurora{--bg-principal:#0b071e;--bg-tarjetas:#140e2d;--bg-sidebar:#191238;--texto-principal:#a855f7;--texto-secundario:#2dd4bf;--borde-color:#2e1f5e;--btn-bg:#1d1542;--btn-sombra-oscura:rgba(0,0,0,.5);--btn-sombra-clara:rgba(168,85,247,.1);--icono-sumido:rgba(45,212,191,.2);--sombra-general:rgba(168,85,247,.1);--accent-color:#a855f7;--check-color:#2dd4bf}` },
            { id: "niebla",   nombre: "Niebla Gris",      icono: "🌫️", color: "#94a3b8",
              css: `body.tema-niebla{--bg-principal:#f1f5f9;--bg-tarjetas:#f8fafc;--bg-sidebar:#e2e8f0;--texto-principal:#334155;--texto-secundario:#64748b;--borde-color:#cbd5e1;--btn-bg:#e2e8f0;--btn-sombra-oscura:rgba(51,65,85,.12);--btn-sombra-clara:rgba(255,255,255,.9);--icono-sumido:rgba(0,0,0,.05);--sombra-general:rgba(0,0,0,.04);--accent-color:#64748b;--check-color:#0ea5e9}` },
            { id: "hielo",    nombre: "Cristal de Hielo", icono: "💎", color: "#7dd3fc",
              css: `body.tema-hielo{--bg-principal:#e0f2fe;--bg-tarjetas:#f0f9ff;--bg-sidebar:#bae6fd;--texto-principal:#0c4a6e;--texto-secundario:#0369a1;--borde-color:#7dd3fc;--btn-bg:#e0f2fe;--btn-sombra-oscura:rgba(12,74,110,.12);--btn-sombra-clara:rgba(255,255,255,.9);--icono-sumido:rgba(0,0,0,.06);--sombra-general:rgba(3,105,161,.06);--accent-color:#0ea5e9;--check-color:#0369a1}` }
        ]
    },
    {
        nombre: "🌿 NATURALEZA",
        temas: [
            { id: "bosque",   nombre: "Bosque Verde",     icono: "🌲", color: "#6dbf85",
              css: `body.tema-bosque{--bg-principal:#1b2620;--bg-tarjetas:#233229;--bg-sidebar:#131c17;--texto-principal:#e1efe6;--texto-secundario:#a3b899;--borde-color:#3b5345;--btn-bg:#2a3d32;--btn-sombra-oscura:rgba(0,0,0,.4);--btn-sombra-clara:rgba(255,255,255,.05);--icono-sumido:rgba(0,0,0,.2);--sombra-general:rgba(0,0,0,.25);--accent-color:#6dbf85;--check-color:#6dbf85}` },
            { id: "musgo",    nombre: "Musgo Oscuro",     icono: "🌿", color: "#4a7c59",
              css: `body.tema-musgo{--bg-principal:#1a2e1f;--bg-tarjetas:#22382a;--bg-sidebar:#111e15;--texto-principal:#d4edd8;--texto-secundario:#8fb899;--borde-color:#2d4a34;--btn-bg:#1f3526;--btn-sombra-oscura:rgba(0,0,0,.45);--btn-sombra-clara:rgba(255,255,255,.04);--icono-sumido:rgba(0,0,0,.2);--sombra-general:rgba(0,0,0,.25);--accent-color:#4a7c59;--check-color:#6dbf85}` },
            { id: "lavanda",  nombre: "Campo Lavanda",    icono: "💜", color: "#9d85c7",
              css: `body.tema-lavanda{--bg-principal:#f5f3ff;--bg-tarjetas:#faf9ff;--bg-sidebar:#ede9fe;--texto-principal:#4c1d95;--texto-secundario:#7c3aed;--borde-color:#c4b5fd;--btn-bg:#ede9fe;--btn-sombra-oscura:rgba(76,29,149,.12);--btn-sombra-clara:rgba(255,255,255,.9);--icono-sumido:rgba(0,0,0,.05);--sombra-general:rgba(76,29,149,.06);--accent-color:#7c3aed;--check-color:#059669}` },
            { id: "oliva",    nombre: "Oliva Toscana",    icono: "🫒", color: "#8a9a5b",
              css: `body.tema-oliva{--bg-principal:#f5f4ec;--bg-tarjetas:#fbfaf3;--bg-sidebar:#e8e6d8;--texto-principal:#3d4220;--texto-secundario:#6b7040;--borde-color:#c8c9a0;--btn-bg:#e8e6d8;--btn-sombra-oscura:rgba(61,66,32,.12);--btn-sombra-clara:rgba(255,255,255,.9);--icono-sumido:rgba(0,0,0,.06);--sombra-general:rgba(0,0,0,.04);--accent-color:#8a9a5b;--check-color:#4a7c59}` },
            { id: "tierra",   nombre: "Tierra Profunda",  icono: "🪨", color: "#5c4033",
              css: `body.tema-tierra{--bg-principal:#1c1410;--bg-tarjetas:#271d17;--bg-sidebar:#120d09;--texto-principal:#d6c4b0;--texto-secundario:#9e8472;--borde-color:#3d2e22;--btn-bg:#332519;--btn-sombra-oscura:rgba(0,0,0,.5);--btn-sombra-clara:rgba(214,196,176,.06);--icono-sumido:rgba(0,0,0,.2);--sombra-general:rgba(0,0,0,.3);--accent-color:#a07850;--check-color:#6dbf85}` }
        ]
    },
    {
        nombre: "🎨 MODERNOS",
        temas: [
            { id: "minimal",  nombre: "Minimal Blanco",   icono: "◻️", color: "#f1f5f9", borde: true,
              css: `body.tema-minimal{--bg-principal:#ffffff;--bg-tarjetas:#fafafa;--bg-sidebar:#f4f4f5;--texto-principal:#18181b;--texto-secundario:#71717a;--borde-color:#e4e4e7;--btn-bg:#f4f4f5;--btn-sombra-oscura:rgba(0,0,0,.08);--btn-sombra-clara:rgba(255,255,255,1);--icono-sumido:rgba(0,0,0,.04);--sombra-general:rgba(0,0,0,.03);--accent-color:#18181b;--check-color:#059669}` },
            { id: "carbon",   nombre: "Carbón Slate",     icono: "🪨", color: "#334155",
              css: `body.tema-carbon{--bg-principal:#0f172a;--bg-tarjetas:#1e293b;--bg-sidebar:#0c1420;--texto-principal:#e2e8f0;--texto-secundario:#94a3b8;--borde-color:#334155;--btn-bg:#1e293b;--btn-sombra-oscura:rgba(0,0,0,.6);--btn-sombra-clara:rgba(255,255,255,.04);--icono-sumido:rgba(255,255,255,.06);--sombra-general:rgba(0,0,0,.4);--accent-color:#38bdf8;--check-color:#34d399}` },
            { id: "tinta",    nombre: "Tinta Sepia",      icono: "✒️", color: "#3d2b1f",
              css: `body.tema-tinta{--bg-principal:#f9f5f0;--bg-tarjetas:#fefcf8;--bg-sidebar:#f0e8dc;--texto-principal:#3d2b1f;--texto-secundario:#7a5c44;--borde-color:#d4bfa8;--btn-bg:#ede1d4;--btn-sombra-oscura:rgba(61,43,31,.14);--btn-sombra-clara:rgba(255,255,255,.9);--icono-sumido:rgba(0,0,0,.06);--sombra-general:rgba(61,43,31,.06);--accent-color:#7a5c44;--check-color:#5a9a6f}` },
            { id: "grafito",  nombre: "Grafito Puro",     icono: "📐", color: "#475569",
              css: `body.tema-grafito{--bg-principal:#1e2433;--bg-tarjetas:#252d3d;--bg-sidebar:#171e2d;--texto-principal:#e2e8f0;--texto-secundario:#94a3b8;--borde-color:#334155;--btn-bg:#2d3648;--btn-sombra-oscura:rgba(0,0,0,.5);--btn-sombra-clara:rgba(255,255,255,.05);--icono-sumido:rgba(255,255,255,.06);--sombra-general:rgba(0,0,0,.3);--accent-color:#64748b;--check-color:#38bdf8}` },
            { id: "rosado",   nombre: "Rosa Moderno",     icono: "🌷", color: "#f472b6",
              css: `body.tema-rosado{--bg-principal:#fff0f6;--bg-tarjetas:#fff5f9;--bg-sidebar:#ffe0ef;--texto-principal:#9d174d;--texto-secundario:#db2777;--borde-color:#fbcfe8;--btn-bg:#fce7f3;--btn-sombra-oscura:rgba(157,23,77,.12);--btn-sombra-clara:rgba(255,255,255,.9);--icono-sumido:rgba(0,0,0,.05);--sombra-general:rgba(157,23,77,.06);--accent-color:#ec4899;--check-color:#059669}` }
        ]
    },
    {
        nombre: "⚡ NEÓN & ESPECIALES",
        temas: [
            { id: "cyberpunk", nombre: "Cyberpunk",       icono: "⚡", color: "#ff007f",
              css: `body.tema-cyberpunk{--bg-principal:#0a0010;--bg-tarjetas:#12001e;--bg-sidebar:#060008;--texto-principal:#ff007f;--texto-secundario:#00f5ff;--borde-color:#3d0060;--btn-bg:#1a0028;--btn-sombra-oscura:rgba(0,0,0,.7);--btn-sombra-clara:rgba(255,0,127,.08);--icono-sumido:rgba(255,0,127,.2);--sombra-general:rgba(255,0,127,.15);--accent-color:#fffb00;--check-color:#00f5ff}` },
            { id: "rgb",       nombre: "Espectro RGB",    icono: "🎮", color: "#00ff66",
              css: `body.tema-rgb{--bg-principal:#090d16;--bg-tarjetas:#111726;--bg-sidebar:#171e30;--texto-principal:#00ff66;--texto-secundario:#00ffff;--borde-color:#3b82f6;--btn-bg:#1e293b;--btn-sombra-oscura:rgba(0,0,0,.6);--btn-sombra-clara:rgba(0,255,102,.1);--icono-sumido:rgba(0,255,102,.2);--sombra-general:rgba(59,130,246,.2);--accent-color:#00ff66;--check-color:#00ff66}` },
            { id: "matrix",    nombre: "Matrix Verde",    icono: "💻", color: "#00ff41",
              css: `body.tema-matrix{--bg-principal:#000a00;--bg-tarjetas:#001200;--bg-sidebar:#000800;--texto-principal:#00ff41;--texto-secundario:#00c832;--borde-color:#003300;--btn-bg:#001a00;--btn-sombra-oscura:rgba(0,0,0,.8);--btn-sombra-clara:rgba(0,255,65,.08);--icono-sumido:rgba(0,255,65,.15);--sombra-general:rgba(0,255,65,.07);--accent-color:#00ff41;--check-color:#00ff41}` },
            { id: "synthwave", nombre: "Synthwave",       icono: "🎹", color: "#e040fb",
              css: `body.tema-synthwave{--bg-principal:#0d0221;--bg-tarjetas:#160633;--bg-sidebar:#08011a;--texto-principal:#f0abfc;--texto-secundario:#e040fb;--borde-color:#4a0e6b;--btn-bg:#220a3a;--btn-sombra-oscura:rgba(0,0,0,.6);--btn-sombra-clara:rgba(224,64,251,.08);--icono-sumido:rgba(224,64,251,.2);--sombra-general:rgba(224,64,251,.1);--accent-color:#f472b6;--check-color:#34d399}` },
            { id: "neon-oro",  nombre: "Neón Dorado",     icono: "✨", color: "#ffd700",
              css: `body.tema-neon-oro{--bg-principal:#0a0800;--bg-tarjetas:#141000;--bg-sidebar:#080600;--texto-principal:#ffd700;--texto-secundario:#ffc107;--borde-color:#3d3000;--btn-bg:#1a1400;--btn-sombra-oscura:rgba(0,0,0,.7);--btn-sombra-clara:rgba(255,215,0,.08);--icono-sumido:rgba(255,215,0,.15);--sombra-general:rgba(255,215,0,.08);--accent-color:#ffd700;--check-color:#ffd700}` }
        ]
    }
];

// ─── Temas secretos ───────────────────────────────────────────────────────────
// Almacén compartido con temas/secretos/*.js
// Cada archivo de tema secreto escribe su id aquí al desbloquearse.
// Esta función lee el almacén y devuelve solo los temas ya desbloqueados.
// builders.js lo consume igual que cualquier categoría — si está vacío, no muestra nada.
// ─────────────────────────────────────────────────────────────────────────────
import { tema as huevoPascua, STORAGE_KEY } from './temas/secretos/huevo-de-pascua.js';

const _CATALOGO_SECRETOS = [ huevoPascua ];
// Cuando agregues más temas secretos:
//   import { tema as otroTema } from './temas/secretos/otro-tema.js';
//   _CATALOGO_SECRETOS.push(otroTema);  ← o agrégalo al array directamente

function _temasDesbloqueados() {
    try {
        const ids = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return _CATALOGO_SECRETOS.filter(t => ids.includes(t.id));
    } catch (_) { return []; }
}

export function getCategoriaSecretos() {
    const desbloqueados = _temasDesbloqueados();
    if (desbloqueados.length === 0) return null;
    return { nombre: "🥚 SECRETOS", temas: desbloqueados };
}
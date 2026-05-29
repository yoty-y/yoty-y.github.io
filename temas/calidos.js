// temas/calidos.js
// ─────────────────────────────────────────────────────────────────────────────
// Categoría: 🌡️ TONOS CÁLIDOS
//
// PLANTILLA — duplica este archivo para crear una nueva categoría:
//   1. Cambia el nombre del export (ej. export const temaNaturaleza)
//   2. Cambia categoria.nombre
//   3. Reemplaza los temas del array con los tuyos
//   4. En config.js añade una línea: import { temaXxx } from './temas/xxx.js';
//      y agrégalo al array categoriasTemas: [..., temaXxx]
//
// Cada tema necesita:
//   OBLIGATORIOS : id, nombre, icono, color, css
//   OPCIONALES   : borde (true añade borde al círculo de color en el menú)
//
// El campo css es un template string con el bloque completo body.tema-[id] {}.
// Variables disponibles (todas deben estar presentes en cada tema):
//   --bg-principal      fondo general de la app
//   --bg-tarjetas       fondo de tarjetas y bloques elevados
//   --bg-sidebar        fondo del sidebar
//   --texto-principal   color de texto primario
//   --texto-secundario  color de texto secundario / muted
//   --borde-color       color de bordes y separadores
//   --btn-bg            fondo de botones y chips
//   --btn-sombra-oscura sombra oscura del neumorfismo
//   --btn-sombra-clara  sombra clara del neumorfismo
//   --icono-sumido      fondo sutil de iconos / hover rows
//   --sombra-general    sombra de tarjetas y menús flotantes
//   --accent-color      color de acento principal (links, barras, badges)
//   --check-color       color del check ✓ de selección activa
// ─────────────────────────────────────────────────────────────────────────────

export const temaCalidos = {
    nombre: "🌡️ TONOS CÁLIDOS",
    temas: [
        {
            id:     "retro",
            nombre: "Retro Rosado",
            icono:  "🌸",
            color:  "#bc4749",
            borde:  false,
            css: `body.tema-retro {
    --bg-principal: #f5ebe0; --bg-tarjetas: #f2e8cf; --bg-sidebar: #e6ccb2;
    --texto-principal: #6b2d5c; --texto-secundario: #bc4749; --borde-color: #ddb892;
    --btn-bg: #ede0d4; --btn-sombra-oscura: rgba(107,45,92,0.15); --btn-sombra-clara: rgba(255,255,255,0.9);
    --icono-sumido: rgba(0,0,0,0.08); --sombra-general: rgba(107,45,92,0.05);
    --accent-color: #bc4749; --check-color: #5a9a6f;
}`
        },
        {
            id:     "desierto",
            nombre: "Desierto Arena",
            icono:  "🏜️",
            color:  "#b4846c",
            borde:  false,
            css: `body.tema-desierto {
    --bg-principal: #dfd3c3; --bg-tarjetas: #f4eee5; --bg-sidebar: #c7b198;
    --texto-principal: #7d5a50; --texto-secundario: #b4846c; --borde-color: #c7b198;
    --btn-bg: #f4eee5; --btn-sombra-oscura: rgba(125,90,80,0.15); --btn-sombra-clara: rgba(255,255,255,0.8);
    --icono-sumido: rgba(0,0,0,0.05); --sombra-general: rgba(0,0,0,0.03);
    --accent-color: #b4846c; --check-color: #5a9a6f;
}`
        },
        {
            id:     "amanecer",
            nombre: "Amanecer Suave",
            icono:  "🌅",
            color:  "#e07b54",
            borde:  false,
            css: `body.tema-amanecer {
    --bg-principal: #fef3ec; --bg-tarjetas: #fff8f3; --bg-sidebar: #fde8d8;
    --texto-principal: #7c2d12; --texto-secundario: #c2410c; --borde-color: #fdba74;
    --btn-bg: #fde8d8; --btn-sombra-oscura: rgba(124,45,18,0.12); --btn-sombra-clara: rgba(255,255,255,0.9);
    --icono-sumido: rgba(0,0,0,0.06); --sombra-general: rgba(194,65,12,0.08);
    --accent-color: #ea580c; --check-color: #15803d;
}`
        },
        {
            id:     "cafe",
            nombre: "Café Oscuro",
            icono:  "☕",
            color:  "#6f4e37",
            borde:  false,
            css: `body.tema-cafe {
    --bg-principal: #2c1a0e; --bg-tarjetas: #3b2314; --bg-sidebar: #1e1009;
    --texto-principal: #e8d5b7; --texto-secundario: #b59a78; --borde-color: #5c3d22;
    --btn-bg: #4a2e18; --btn-sombra-oscura: rgba(0,0,0,0.5); --btn-sombra-clara: rgba(232,213,183,0.08);
    --icono-sumido: rgba(0,0,0,0.25); --sombra-general: rgba(0,0,0,0.35);
    --accent-color: #d97706; --check-color: #6dbf85;
}`
        },
        {
            id:     "brasa",
            nombre: "Brasa Naranja",
            icono:  "🔥",
            color:  "#ff4d00",
            borde:  false,
            css: `body.tema-brasa {
    --bg-principal: #0f0f12; --bg-tarjetas: #18181c; --bg-sidebar: #241414;
    --texto-principal: #ff4d00; --texto-secundario: #ff9e00; --borde-color: #ff3c00;
    --btn-bg: #212126; --btn-sombra-oscura: rgba(0,0,0,0.6); --btn-sombra-clara: rgba(255,77,0,0.05);
    --icono-sumido: rgba(255,77,0,0.2); --sombra-general: rgba(0,0,0,0.5);
    --accent-color: #ff9e00; --check-color: #ff4d00;
}`
        }
    ]
};
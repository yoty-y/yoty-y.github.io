// js/temas-engine.js
// ─────────────────────────────────────────────────────────────────────────────
// Gestiona dos responsabilidades:
//
//   1. INYECCIÓN CSS — recibe un bloque css (string) y lo monta en el <head>
//      con un <style id="tema-activo">. core.js lo llama al aplicar cada tema.
//
//   2. DESBLOQUEOS — escucha el evento global 'desbloquearTema', valida la
//      clave, persiste en localStorage y avisa al resto de la app para que
//      el menú se regenere mostrando el tema recién desbloqueado.
//
// ─── API pública ──────────────────────────────────────────────────────────────
//   inyectarCSS(cssString)          → monta o reemplaza el <style> del tema
//   estaDesbloqueado(idTema)        → true/false, lee localStorage
//   desbloquear(idTema)             → persiste y dispara 'temaDesbloqueado'
//   inicializar(categoriasTemas)    → registra escucha del evento de desbloqueo
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'temas-desbloqueados';   // JSON array de ids

// ── Helpers de persistencia ───────────────────────────────────────────────────
function _leerDesbloqueados() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (_) { return []; }
}

function _escribirDesbloqueados(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

// ── Inyección de CSS ──────────────────────────────────────────────────────────
export function inyectarCSS(cssString) {
    // Si el tema no tiene CSS propio (basicos con css: null) no hace nada.
    // El bloque anterior se elimina para no acumular estilos huérfanos.
    let tag = document.getElementById('tema-activo');
    if (!cssString) {
        if (tag) tag.textContent = '';
        return;
    }
    if (!tag) {
        tag = document.createElement('style');
        tag.id = 'tema-activo';
        document.head.appendChild(tag);
    }
    tag.textContent = cssString;
}

// ── Consulta de desbloqueo ────────────────────────────────────────────────────
export function estaDesbloqueado(idTema) {
    return _leerDesbloqueados().includes(idTema);
}

// ── Desbloquear un tema ───────────────────────────────────────────────────────
export function desbloquear(idTema) {
    const lista = _leerDesbloqueados();
    if (lista.includes(idTema)) return;   // ya estaba desbloqueado, no duplicar
    lista.push(idTema);
    _escribirDesbloqueados(lista);
    // Avisa a builders.js (y a quien quiera escuchar) para que regenere el menú
    window.dispatchEvent(new CustomEvent('temaDesbloqueado', { detail: idTema }));
}

// ── Inicialización ────────────────────────────────────────────────────────────
// app.js llama a esto una vez al arrancar, pasando todas las categorías.
// Registra la escucha del evento 'desbloquearTema' que puede disparar
// cualquier página (secreto.js, u otras que crees).
//
// Formato del evento:
//   window.dispatchEvent(new CustomEvent('desbloquearTema', {
//       detail: { idTema: 'nombre-del-tema', clave: 'valor-opcional' }
//   }));
//
// Si el tema tiene una propiedad desbloqueo.clave definida en su objeto,
// el engine la valida antes de persistir. Si no tiene clave, desbloquea directo.
// ─────────────────────────────────────────────────────────────────────────────
export function inicializar(categoriasTemas) {
    // Construir índice plano id → objeto tema para validación rápida
    const indiceTemas = {};
    categoriasTemas.forEach(cat => {
        (cat.temas || []).forEach(t => { indiceTemas[t.id] = t; });
    });

    window.addEventListener('desbloquearTema', e => {
        const { idTema, clave } = e.detail || {};
        if (!idTema) return;

        const tema = indiceTemas[idTema];
        if (!tema) {
            console.warn(`[temas-engine] Tema desconocido: "${idTema}"`);
            return;
        }

        // Validar clave si el tema la requiere
        if (tema.desbloqueo?.clave && tema.desbloqueo.clave !== clave) {
            console.warn(`[temas-engine] Clave incorrecta para "${idTema}"`);
            return;
        }

        desbloquear(idTema);
    });
}
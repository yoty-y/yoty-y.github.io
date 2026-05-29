// config.js
import { paginas }     from './paginas.js';
import { temasBasicos } from './temas/basicos.js';
import { temaCalidos }  from './temas/calidos.js';
// ── Cuando agregues más categorías, solo añade una línea aquí: ────────────────
// import { temaFrios }       from './temas/frios.js';
// import { temaNaturaleza }  from './temas/naturaleza.js';
// import { temaModernos }    from './temas/modernos.js';
// import { temaNeon }        from './temas/neon.js';
// import { temaBloqueados }  from './temas/bloqueados.js';  ← temas secretos
// ─────────────────────────────────────────────────────────────────────────────

export const configSitio = {
    paginas,
    temasBasicos,

    // Añade cada nueva categoría al array — el orden aquí es el orden en el menú
    categoriasTemas: [
        temaCalidos,
        // temaFrios,
        // temaNaturaleza,
        // temaModernos,
        // temaNeon,
        // temaBloqueados,
    ]
};
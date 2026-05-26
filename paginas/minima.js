// paginas/minima.js
// Página raíz mínima — demuestra todas las clases base de estilos.css sin agregar nada propio.

export const contenido = `
    <div class="bloque-lectura">

        <span class="badge">✦ Mínima</span>

        <h3 class="titulo-contenido" style="margin-top: 18px;">
            Título de<br>la Página
        </h3>

        <p class="parrafo-contenido">
            Este es un párrafo fijo. Siempre visible sin importar el modo de lectura.
        </p>

        <div class="separador-deco">contenido dinámico</div>

        <texto-dinamico
            extenso="<p class='txt-detallado'>Versión detallada: visible solo en modo 📚. Usa esta clase para contenido extenso que el usuario puede elegir no ver.</p>"
            corto="<p class='txt-resumido'>Versión resumida: visible solo en modo ⚡.</p>">
        </texto-dinamico>

        <div class="bloque-acento" style="margin-top: 20px;">
            <texto-dinamico
                extenso="Este bloque lateral es ideal para citas o notas. También respeta el modo de lectura."
                corto="Bloque de acento. Úsalo para lo que importa.">
            </texto-dinamico>
        </div>

        <div class="separador-deco">chips</div>

        <div style="display:flex; flex-wrap:wrap; gap:8px;">
            <span class="chip chip-verde">✅ Activo</span>
            <span class="chip chip-naranja">⚠️ Pendiente</span>
            <span class="chip chip-azul">ℹ️ Info</span>
            <span class="chip chip-rojo">❌ Error</span>
        </div>

    </div>
`;

// inicializar() es opcional — solo se necesita si la página tiene lógica JS propia.
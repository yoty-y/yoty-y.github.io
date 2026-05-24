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

        <div class="bloque-acento" style="margin-top: 24px;">
            <texto-dinamico
                extenso="La simplicidad no está reñida con la elegancia — este sistema fue diseñado para crecer sin volverse complicado."
                corto="Simple de expandir, elegante por diseño.">
            </texto-dinamico>
        </div>
    </div>
`;
export const contenido = `
    <div class="bloque-lectura">
        <span class="badge">✦ Demo</span>

        <h3 class="titulo-contenido" style="margin-top: 18px;">
            Sub-página Demostrativa
        </h3>

        <texto-dinamico
            extenso="Aquí puedes poner párrafos enteros, imágenes, e incluso tablas largas para el modo de lectura enfocado. Este modo está pensado para quien quiere absorber cada detalle."
            corto="Un resumen súper rápido para el que tiene prisa.">
        </texto-dinamico>

        <div class="separador-deco" style="margin: 28px 0;">sincronía</div>

        <texto-dinamico
            extenso="Incluso puedes tener múltiples bloques <strong>texto-dinamico</strong> separados en la misma página, y todos cambiarán al mismo tiempo cuando el usuario alterne el modo de lectura desde el menú."
            corto="Todo cambia en sincronía perfecta. Sin recargar, sin saltos.">
        </texto-dinamico>

        <div class="bloque-acento">
            <texto-dinamico
                extenso="Este bloque con borde lateral es ideal para citas, notas importantes o llamadas de atención dentro del contenido."
                corto="Úsalo para destacar lo que importa.">
            </texto-dinamico>
        </div>
    </div>
`;
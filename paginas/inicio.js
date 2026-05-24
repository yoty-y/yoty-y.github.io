export const contenido = `
    <div class="bloque-lectura">
        <h3 class="titulo-contenido">Página de Inicio</h3>
        
        <p style="color: var(--texto-secundario); margin-bottom: 20px;">
            Este es un texto fijo. Nunca cambia sin importar el modo en el que estés.
        </p>

        <texto-dinamico 
            extenso="
                <h4>🚀 El Futuro del Desarrollo Web</h4>
                <div class='txt-detallado'>
                    El diseño web moderno ha evolucionado hacia arquitecturas sumamente dinámicas. 
                    Usar Web Components como este nos permite tener un código extremadamente limpio y reutilizable.
                </div>
            "
            corto="
                <h4>🚀 Desarrollo Web Rápido</h4>
                <div class='txt-resumido'>
                    Usa Web Components para tener código limpio y rápido. ¡Eficiencia pura! ⚡
                </div>
            ">
        </texto-dinamico>
    </div>
`;
// js/componentes.js

class TextoDinamico extends HTMLElement {
    connectedCallback() {
        // Al insertarse en el HTML, dibuja su contenido
        this.renderizar();

        // Escucha si el usuario cambia el modo en el menú
        window.addEventListener('modoLecturaCambiado', () => {
            this.renderizar();
        });
    }

    renderizar() {
        // Obtiene el estado global guardado o por defecto
        const modo = window.modoLecturaActual || 'detallada';
        
        // Extrae los atributos que escribiste en el HTML
        const textoExtenso = this.getAttribute('extenso') || '';
        const textoCorto = this.getAttribute('corto') || '';

        // Inyecta el texto correspondiente
        this.innerHTML = modo === 'detallada' ? textoExtenso : textoCorto;
    }
}

// Registramos la nueva etiqueta para que el navegador la entienda
customElements.define('texto-dinamico', TextoDinamico);
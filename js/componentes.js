// js/componentes.js
// Define el web component <texto-dinamico> una sola vez.

class TextoDinamico extends HTMLElement {
    connectedCallback() {
        this.renderizar();
        window.addEventListener('modoLecturaCambiado', () => this.renderizar());
    }

    renderizar() {
        const modo = window.modoLecturaActual || 'detallada';
        this.innerHTML = modo === 'detallada'
            ? (this.getAttribute('extenso') || '')
            : (this.getAttribute('corto')   || '');
    }
}

if (!customElements.get('texto-dinamico')) {
    customElements.define('texto-dinamico', TextoDinamico);
}
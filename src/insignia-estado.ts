import estilos from './insignia-estado.css?inline';

export class InsigniaEstado extends HTMLElement {

    static observedAttributes = ['estado'];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.pintar();
    }

    attributeChangedCallback() {
        this.pintar();
    }

    private pintar() {
        const estado = this.getAttribute('estado') ?? 'disponible';

        let texto = 'Disponible';
        let clase = 'disponible';

        if (estado === 'pocas-piezas') {
            texto = 'Pocas piezas';
            clase = 'pocas-piezas';
        } else if (estado === 'agotado') {
            texto = 'Agotado';
            clase = 'agotado';
        }

        this.shadowRoot!.innerHTML = `
            <style>${estilos}</style>
            <span class="${clase}">${texto}</span>
        `;
    }
}

customElements.define('insignia-estado', InsigniaEstado);
import estilos from "./tarjeta-producto.css?inline";

export class TarjetaProducto extends HTMLElement {

    static observedAttributes = ['producto-id', 'nombre', 'precio', 'imagen', 'existencia'];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.pintar();
    }

    attributeChangedCallback() {
        if (this.isConnected) {
            this.pintar();
        }
    }

    private pintar() {
        const id = this.getAttribute('producto-id') ?? '';
        const nombre = this.getAttribute('nombre') ?? '';
        const precio = Number(this.getAttribute('precio'));
        const imagen = this.getAttribute('imagen') ?? '';
        const existencia = Number(this.getAttribute('existencia'));

        const agotado = existencia === 0;

        let textoExistencia = existencia + ' disponibles';
        let claseExistencia = 'existencia';
        let atributoBoton = '';

        if (agotado) {
            textoExistencia = 'Agotado';
            claseExistencia = 'existencia agotado';
            atributoBoton = 'deshabilitado';
        }

        const precioTexto = precio.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });

        this.shadowRoot!.innerHTML = `
            <style>${estilos}</style>
            <article class="tarjeta">
                <img src="${imagen}" alt="${nombre}">
                <div class="cuerpo">
                    <h3>${nombre}</h3>
                    <p class="precio">${precioTexto}</p>
                    <p class="${claseExistencia}">${textoExistencia}</p>
                    <boton-app ${atributoBoton}>Agregar al carrito</boton-app>
                </div>
            </article>
        `;

        const boton = this.shadowRoot!.querySelector('boton-app')!;
        boton.addEventListener('click', () => {
            if (agotado) {
                return;
            }
            this.dispatchEvent(new CustomEvent('agregar', {
                detail: {
                    id: id,
                    nombre: nombre,
                    precio: precio
                },
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define('tarjeta-producto', TarjetaProducto);
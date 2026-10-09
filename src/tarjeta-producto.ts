import estilos from "./tarjeta-producto.css?inline";

export class TarjetaProducto extends HTMLElement {

    static observedAttributes = ['producto-id', 'nombre', 'precio', 'imagen', 'existencia'];

    private agregadas = 0;

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

    reiniciar() {
        this.agregadas = 0;
        this.pintar();
    }

    private pintar() {
        const id = this.getAttribute('producto-id') ?? '';
        const nombre = this.getAttribute('nombre') ?? '';
        const precio = Number(this.getAttribute('precio'));
        const imagen = this.getAttribute('imagen') ?? '';
        const existencia = Number(this.getAttribute('existencia'));

        const disponibles = existencia - this.agregadas;
        const agotado = disponibles <= 0;

        let textoExistencia = disponibles + ' disponibles';
        let claseExistencia = 'existencia';
        let atributoBoton = '';
        let estadoInsignia = 'disponible';

        if (agotado) {
            textoExistencia = 'Agotado';
            claseExistencia = 'existencia agotado';
            atributoBoton = 'deshabilitado';
            estadoInsignia = 'agotado';
        } else if (disponibles <= 5) {
            estadoInsignia = 'pocas-piezas';
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
                    <insignia-estado estado="${estadoInsignia}"></insignia-estado>
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
            this.agregadas++;
            this.dispatchEvent(new CustomEvent('agregar', {
                detail: {
                    id: id,
                    nombre: nombre,
                    precio: precio
                },
                bubbles: true,
                composed: true
            }));
            this.pintar();
        });
    }
}

customElements.define('tarjeta-producto', TarjetaProducto);
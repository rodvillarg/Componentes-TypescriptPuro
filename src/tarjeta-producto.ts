import estlos from "./tarjeta-producto.css?inline";

export class TarjetaProducto extends HTMLElement{
    
    static observedAtribbute = ['producto-id', 'nombre', 'precio', 'imagen', 'existencia']
    
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.pintar();
    }

    private pintar(){
        const id = this.getAttribute('producto-id') ?? '';
        const nombre = this.getAttribute('nombre') ?? '';
        const precio = this.getAttribute('precio') ?? '';
        const imagen = this.getAttribute('imagen') ?? '';
        const existencia = Number(this.getAttribute('existencia'));

        const agotado = existencia === 0;
        this.shadowRoot!.innerHTML = `
            <style>${estlos}</style>
            <article class="tarjeta">
            <img src="${imagen}" alt="${nombre}">
            <div class="cuerpo">
                <h3>${nombre}</h3>
                <p class="${precio}">$1,299.00</p>
                <p class="${existencia}">8 disponibles</p>
                <boton-app>Agregar al carrito</boton-app>
            </div>
            </article>
  
        `;
    }
}

customElements.define('tarjeta-producto', TarjetaProducto);
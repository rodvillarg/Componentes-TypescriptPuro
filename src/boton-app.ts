import estilos from './boton-app.css?inline';

export class BotonApp extends HTMLElement{
    //ENTRADAS:

    static observedAttributes = ['variante', 'deshabilitado'];

    private boton: HTMLButtonElement;

    //Se ejecuta cuando se crea el elemento
    constructor(){
        super();

        const sombra = this.attachShadow({mode: 'open'});
        
        sombra.innerHTML = `
            <style>${estilos}</style>
            <button><slot></slot></button>
        `

        this.boton = sombra.querySelector('button')!;
    }

    //connectedCallback - cuando la etiqueta ENTRA en la pagina
    connectedCallback(){
        this.pintar();

    }

    attributeChangedCallback(){
        this.pintar();
    }

    //dissconectedCallBack -- cuando el elemento sale de la pagina
    //adoptedCallback -- cuando la etiqueta se muda de una pagina a otra

    private pintar(){
        this.boton.className = this.getAttribute('variante') ?? 'primario';
        this.boton.disabled = this.hasAttribute('deshabilitado');
    }
}

//COMO SE VA A LLAMAR EL ELEMENTO
customElements.define('boton-app', BotonApp);
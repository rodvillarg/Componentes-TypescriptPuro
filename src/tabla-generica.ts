import estilos from './tabla-generica.css?inline';
import type { Columna } from './tipos';

export class TablaGenerica extends HTMLElement {

    private _columnas: Columna[] = [];
    private _filas: Record<string, unknown>[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.pintar();
    }

    set columnas(valor: Columna[]) {
        this._columnas = valor;
        this.pintar();
    }

    get columnas(): Columna[] {
        return this._columnas;
    }

    set filas(valor: Record<string, unknown>[]) {
        this._filas = valor;
        this.pintar();
    }

    get filas(): Record<string, unknown>[] {
        return this._filas;
    }

    private pintar() {
        let titulos = '';
        for (const columna of this._columnas) {
            titulos += `<th>${columna.titulo}</th>`;
        }

        let filas = '';
        for (const objeto of this._filas) {
            filas += '<tr>';
            for (const columna of this._columnas) {
                filas += `<td>${objeto[columna.clave]}</td>`;
            }
            filas += '</tr>';
        }

        if (this._filas.length === 0) {
            filas = `<tr><td class="vacio" colspan="${this._columnas.length}">Sin datos</td></tr>`;
        }

        this.shadowRoot!.innerHTML = `
            <style>${estilos}</style>
            <table>
                <thead><tr>${titulos}</tr></thead>
                <tbody>${filas}</tbody>
            </table>
        `;
    }
}

customElements.define('tabla-generica', TablaGenerica);
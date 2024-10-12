import { ImlHTMLElement } from './iml-html-element.js';
import { property } from './decorators';

/**
 * Classe de base pour toutes les icônes
 */
export class ImlIconElement extends ImlHTMLElement {

    /** La largeur de l'icône */
    @property({ render: true, type: 'number' }) width: number = 15;

    /** La hauteur de l'icône */
    @property({ render: true, type: 'number' }) height: number = 15;

    protected override css() {
        return `
        <style>
            :host {
                ${this.parentNode instanceof ShadowRoot ? '' : 'fill: transparent;'} 
                width: ${this.width}px;
                height: ${this.height}px;
                display: block;
            }
        </style>`;
    }

}
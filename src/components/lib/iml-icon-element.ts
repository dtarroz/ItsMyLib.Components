import { ImlHTMLElement } from './iml-html-element.js';

/**
 * Classe de base pour toutes les icônes
 */
export class ImlIconElement extends ImlHTMLElement {

    protected override css() {
        return this.parentNode instanceof ShadowRoot ? '' : `
        <style>
            :host {
                display: none; 
            }
        </style>`;
    }

}
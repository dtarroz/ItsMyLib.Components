import { ImlHTMLElement } from './lib/iml-htmlelement.js';
import { customElement, property } from './lib/decorators.js';

type TypeCustomEventImlButton = 'iml-button:click';

@customElement('iml-button')
export class ImlButton extends ImlHTMLElement<TypeCustomEventImlButton> {

    /** Le mode de rendu du bouton */
    @property() mode: 'primary' | 'secondary' = 'primary';

    /** L'url de redirection après le clic sur le bouton, seulement si l'événement n'a pas été explicitement annulé */
    @property('redirect-to-url') redirectToUrl?: string;

    /** L'état du rendu du bouton */
    @property() status: 'active' | 'inactive' | 'disabled' = 'active';

    protected override html() {
        return `<button class="${this.mode} ${this.status}"><slot></slot></button>`;
    }

    protected override renderUpdated() {
        this.queryShadowSelector('button')?.addEventListener('click', (event) => {
            if (this.status == 'active') {
                if (!this.dispatchCustomEvent('iml-button:click', { cancelable: true }))
                    event.preventDefault();
                else if (this.redirectToUrl)
                    document.location = this.redirectToUrl;
            }
        });
    }

    protected override css() {
        return `
        <!--suppress CssUnresolvedCustomProperty -->
        <style>
            :host {
                --font-size: var(--iml-button-font-size, 0.91rem);
                width: 150px;
            }
            
            button {
                padding: 12px;
                border-radius: 7px;
                border: 0;
                width: 100%;
                font-family: Arial, sans-serif;
                font-weight: bold;
                font-size: var(--font-size);
            }
            
            .primary {
                color: #161616;
                background-color: hsl(60, 94%, 42%);
            }
            
            .primary.active:hover {
                background-color: hsl(60, 94%, 47%);
            }
            
            .secondary {
                color:  #c6c6c6;
                background-color: transparent;
                border: 1px solid  #c6c6c6;
            }
            
            .secondary.active:hover {
                color:  hsl(60, 94%, 47%);
                border: 1px solid hsl(60, 94%, 47%);
            }
            
            .active:hover {
                cursor: pointer;
            }
            
            .disabled {
                opacity: 0.5;
                cursor: default;
            }
        </style>`;
    }
}

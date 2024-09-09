import { ImlHTMLElement } from './lib/iml-htmlelement.js';
import { customElement, property } from './lib/decorators.js';

type TypeCustomEventImlButton = 'iml-button:click';

@customElement('iml-button')
export class ImlButton extends ImlHTMLElement<TypeCustomEventImlButton> {

    /** Le mode de rendu du bouton */
    @property() mode: 'primary' | 'secondary' = 'primary';

    /** L'url de redirection après le clic sur le bouton, seulement si l'événement n'a pas été explicitement annulé */
    @property('redirect-to-url') redirectToUrl?: string;

    /** Le bouton est inactif si la valeur est égal à true */
    @property() disabled: boolean = false;

    protected override html() {
        return `<button class="${this.componentClass()}"><slot></slot></button>`;
    }

    private componentClass() {
        let classMap: string[] = [this.mode];
        if (this.disabled)
            classMap.push('disabled');
        return classMap.join(' ');
    }

    protected override renderUpdated() {
        this.queryShadowSelector('button, a')?.addEventListener('click', (event) => {
            if (this.disabled)
                return;
            if (!this.dispatchCustomEvent('iml-button:click', { cancelable: true }))
                event.preventDefault();
            else if (this.redirectToUrl)
                document.location = this.redirectToUrl;
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
                cursor: pointer;
            }
            
            .primary {
                color: #161616;
                background-color: hsl(60, 94%, 42%);
            }
            
            .primary:not(.disabled):hover {
                background-color: hsl(60, 94%, 47%);
            }
            
            .secondary {
                color:  #c6c6c6;
                background-color: transparent;
                border: 1px solid  #c6c6c6;
            }
            
            .secondary:not(.disabled):hover {
                border: 1px solid hsl(60, 94%, 47%);
            }
            
            .disabled {
                opacity: 0.5;
                cursor: default;
            }
        </style>`;
    }
}

import { ImlHTMLElement } from './lib/iml-html-element.js';
import { customElement, property } from './lib/decorators.js';
import { ImlDialog } from './iml-dialog.js';
import './iml-dialog.js';
import { ImlButton } from './iml-button.js';
import './iml-button.js';

type TypeCustomEventImlConfirm = 'iml-confirm:confirm';

@customElement('iml-confirm')
export class ImlConfirm extends ImlHTMLElement<TypeCustomEventImlConfirm> {

    private $dialog: ImlDialog | null = null;
    private $buttonYes: ImlButton | null = null;
    private $buttonNo: ImlButton | null = null;

    /** Le libelle du bouton 'Oui' (celui de gauche) */
    @property() buttonYesCaption: string = 'Oui';

    /** Le mode de rendu du bouton 'Oui' (celui de gauche) */
    @property() buttonYesMode: 'primary' | 'secondary' = 'primary';

    /** Le libelle du bouton 'Non' (celui de droite) */
    @property() buttonNoCaption: string = 'Non';

    /** Le mode de rendu du bouton 'Non' (celui de droite) */
    @property() buttonNoMode: 'primary' | 'secondary' = 'secondary';

    /** Le titre de la boite de dialogue modale */
    @property() headerTitle?: string;

    /** L'état du rendu de la boite de dialogue */
    @property() size: 'x-small' | 'small' | 'large' = 'small';

    /** Affiche la boite de dialogue modale */
    show() {
        this.$dialog?.show();
    }

    protected override html() {
        return `
            <iml-dialog close-button="false" size="${this.size}" header-title="${this.headerTitle}" data-dialog>
                <slot></slot>
                <div class="footer">
                    <iml-button mode="${this.buttonYesMode}" data-button-yes>
                        ${this.buttonYesCaption}
                    </iml-button>
                    <iml-button mode="${this.buttonNoMode}" data-button-no>
                        ${this.buttonNoCaption}
                    </iml-button>
                </div>
            </iml-dialog>`;
    }

    protected override renderUpdated() {
        this.$dialog = this.queryShadowSelector('[data-dialog]');
        this.$buttonYes = this.queryShadowSelector('[data-button-yes]');
        this.$buttonNo = this.queryShadowSelector('[data-button-no]');
        this.$buttonYes?.addEventListener('iml-button:click', () => this._click('yes'));
        this.$buttonNo?.addEventListener('iml-button:click', () => this._click('no'));
    }

    private _click(button: string) {
        this.dispatchCustomEvent('iml-confirm:confirm', { detail: button });
        this.$dialog?.close();
    }

    protected override css() {
        return `
            <style>
                .footer {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 50px;
                    padding-top: 10px;
                    padding-bottom: 20px;
                }
            </style>`;
    }
}

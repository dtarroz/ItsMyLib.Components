import { ImlHTMLElement } from './lib/iml-html-element.js';
import { customElement, property } from './lib/decorators.js';
import './iml-icon-cross.js';
import { ImlIcon } from './iml-icon.js';

@customElement('iml-dialog')
export class ImlDialog extends ImlHTMLElement {

    private $container: HTMLDivElement | null = null;
    private $buttonClose: ImlIcon | null = null;

    /** Le titre de la boite de dialogue modale */
    @property() headerTitle?: string;

    /** Affiche ou non le bouton de fermeture */
    @property({ type: 'boolean', changedCallback: '_updateAttribut' }) closeButton: boolean = true;

    /** L'état du rendu du bouton */
    @property() size: 'x-small' | 'small' | 'large' = 'small';

    /** Affiche la boite de dialogue modale */
    show() {
        if (!this.isShowing()) {
            this.dispatchCustomEvent('iml-dialog:show');
            this.$container?.classList.add('active');
        }
    }

    /** Ferme la boite de dialogue modale */
    close() {
        this.$container?.classList.remove('active');
    }

    protected override html() {
        return `
            <div class="container" data-container>
                <div class="overlay"></div>
                <div class="dialog ${this.size}">
                    <iml-icon-cross class="close ${this.closeButton ? '' : 'hidden'}" data-close></iml-icon-cross>
                    <div class="header">
                        <div class="header-title">${this.headerTitle}</div>
                    </div>
                    <slot></slot>
                </div>
            </div>`;
    }

    protected override renderUpdated() {
        this.$container = this.queryShadowSelector('[data-container]');
        this.$buttonClose = this.queryShadowSelector('[data-close]');
        this.$buttonClose?.addEventListener('click', () => this.close());
    }

    // @ts-ignore
    private _updateAttribut(_: string, __: string, ___: string): void {
        if (this.closeButton)
            this.$buttonClose?.classList.remove('hidden');
        else
            this.$buttonClose?.classList.add('hidden');
    }

    private isShowing(): boolean {
        return this.$container?.classList.contains('active') ?? false;
    }

    protected override css() {
        return `
            <!--suppress CssUnresolvedCustomProperty -->
            <style>
                :host {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                }
            
                .container {
                    visibility: hidden;
                    opacity: 0;
                    position: fixed;
                    inset: 0;
                    transition: opacity 0.4s ease-out, visibility 0.4s;
                    min-height: 500px;
                }
                
                .container.active {
                    visibility: visible;
                    opacity: 1;
                    pointer-events: auto;
                }
                
                .overlay {
                    position: fixed;
                    inset: 0;
                    background-color: black;
                    opacity: 0.4;
                }
                
                .dialog {
                    width: 95%;
                    max-width: 550px;
                    background-color: #161616;
                    border-radius: 7px;
                    position: absolute;
                    top: 40%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                    border: 1px solid rgb(255, 255, 0, 0.85);
                }
                
                .dialog.large {
                    max-width: 600px;
                }
                
                .dialog.small {
                    max-width: 500px;
                }
                
                .dialog.x-small {
                    max-width: 400px;
                }
                
                .close {
                    display: block;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    fill: #c6c6c6;
                    width: 14px;
                    height: 14px;
                    cursor: pointer;
                }
                
                .close:hover {
                    fill: rgb(255, 255, 0, 0.85);
                }
                
                .close.hidden {
                    display: none;
                }
                
                .header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .header-title {
                    color: rgb(255, 255, 0, 0.8);
                    font-size: 1.35rem;
                    font-family: Arial, sans-serif;
                    padding-top: 15px;
                }
                
                @media (max-width: 800px) {
                    .header-title {
                        font-size: 1.2rem;
                    }
                
                    .close {
                        width: 15px;
                        height: 15px;
                    }
                }
                
                @media (max-height: 700px) {
                    .dialog {
                        top: 50%;
                    }
                }
                
                @media (max-height: 550px) {
                    .dialog {
                        width: 400px;
                    }
                }
                
                @media (max-height: 500px) {
                    .dialog {
                        max-height: calc(100vh - 40px);
                        overflow-y: auto;
                        position: fixed;
                        top: 50%;
                    }
                
                    .close {
                        width: 15px;
                        height: 15px;
                    }
                }
            </style>`;
    }
}

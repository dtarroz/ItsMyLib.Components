import { ImlHTMLElement } from './lib/iml-html-element.js';
import { customElement, property } from './lib/decorators.js';
import './iml-icon-three-dots.js';

type TypeCustomEventImlMenu = 'iml-menu:action-click';

interface ImlMenuAction {
    name: string;
    icon: string;
    caption: string;
}

@customElement('iml-menu')
export class ImlMenu extends ImlHTMLElement<TypeCustomEventImlMenu> {

    private $button: HTMLButtonElement | null = null;
    private $menu: HTMLDivElement | null = null;

    private boundDocumentClick?: (evt: Event) => void;

    /** Nom de l'icône affichée dans le bouton d'action */
    @property({ render: true }) icon: string = 'three-dots';

    /** Liste des actions du menu */
    @property({ type: 'object', render: true }) actions: ImlMenuAction[] = [];

    /** Ouvre le menu */
    open() {
        if (this.$menu?.classList.contains('open')) {
            this.close();
        }
        else {
            this.$menu?.classList.add('open');
            this.$button?.classList.add('open');
        }
    }

    /** Ferme le menu */
    close() {
        this.$menu?.classList.remove('open');
        this.$button?.classList.remove('open');
    }

    protected override html() {
        const itemsHtml = (this.actions || []).map(a => {
            return `
                <div class="item" data-name="${a.name}">
                    <iml-icon name="${a.icon}"></iml-icon>
                    <span class="caption">${a.caption}</span>
                </div>`;
        }).join('');

        return `
            <button class="action">
                <iml-icon name="${this.icon}"></iml-icon>
            </button>
            <div class="menu">
                ${itemsHtml}
            </div>
        `;
    }

    protected override renderUpdated() {
        this.$button = this.queryShadowSelector('button.action')!;
        this.$menu = this.queryShadowSelector('div.menu')!;

        this.$button.addEventListener('click', () => this.open());

        // créer listeners pour les items
        const items = Array.from(this.$menu.querySelectorAll('.item')) as HTMLElement[];
        for (const item of items)
            item.addEventListener('click', this.handleActionClick);

        // document click pour fermer si click en dehors
        if (!this.boundDocumentClick) {
            this.boundDocumentClick = (evt: Event) => {
                const path = (evt as any).composedPath ? (evt as any).composedPath() : (evt as any).path || [];
                if (!path.includes(this)) {
                    if (this.$menu?.classList.contains('open'))
                        this.close();
                }
            };
            document.addEventListener('click', this.boundDocumentClick);
        }
    }

    private handleActionClick = (evt: Event) => {
        const target = evt.currentTarget as HTMLElement;
        const name = target.getAttribute('data-name') || undefined;
        if (name) {
            const shouldProceed = this.dispatchCustomEvent('iml-menu:action-click', { cancelable: true, detail: name });
            // si l'événement n'a pas été preventDefault, on ferme
            if (shouldProceed)
                this.close();
        }
    };

    protected override css() {
        return `
        <style>
            :host {
                position: relative;
                display: inline-block;
            }

            button.action {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 8px 10px;
                border-radius: 6px;
                border: 0;
                background: transparent;
                cursor: pointer;
                font-family: Arial, sans-serif;
            }
            
            button.action iml-icon {
                fill:  #c6c6c6;
                display: block;
                width: 16px;
                height: 16px;
            }
            
            button.action iml-icon:hover,
            button.action.open iml-icon {
                fill: hsl(60, 94%, 42%);
            }

            .label {
                font-size: 0.95rem;
            }

            .menu {
                position: absolute;
                bottom: calc(100% + 8px);
                right: 0;
                min-width: 160px;
                background: white;
                border: 1px solid #e5e5e5;
                border-radius: 6px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.08);
                padding: 6px 0;
                display: none;
                z-index: 9999;
            }

            .menu.open {
                display: block;
            }

            .item {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                cursor: pointer;
                outline: none;
            }

            .item:hover, .item:focus {
                background: #f5f5f5;
            }

            .item iml-icon {
                width: 16px;
                height: 16px;
                display: inline-block;
            }

            .caption {
                font-size: 0.95rem;
            }
        </style>`;
    }

}

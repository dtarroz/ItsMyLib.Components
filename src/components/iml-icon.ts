import { ImlIconElement } from './lib/iml-icon-element.js';
import { customElement, property } from './lib/decorators.js';

@customElement('iml-icon')
export class ImlIcon extends ImlIconElement {

    /** Le nom de l'icône */
    @property({ render: true }) name: 'arrow' | 'search' | 'circle-plus'  | 'filter' | 'cross' = 'arrow';
    
    protected override html() {
        return `<iml-icon-${this.name}></iml-icon-${this.name}>`;
    }

}
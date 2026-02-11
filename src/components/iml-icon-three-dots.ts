import { ImlIconElement } from './lib/iml-icon-element.js';
import { customElement } from './lib/decorators.js';

@customElement('iml-icon-three-dots')
export class ImlIconThreeDots extends ImlIconElement {

    protected override html() {
        return `<svg viewBox="0 0 16 16">
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                </svg>`;
    }
    
}
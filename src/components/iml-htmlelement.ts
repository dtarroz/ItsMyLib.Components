export class ImlHTMLElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    
    /**
     * Rendu HTML du Shadow DOM
     * @protected
     */
    protected html(): string {
        return '';
    }

    /**
     * Style CSS dans le Shadow DOM.
     * Ne pas oublier d'inclure la balise <style></style>.
     * @protected
     */
    protected css(): string {
        return '';
    }

    // noinspection JSUnusedGlobalSymbols
    protected render() {
        this.renderHtml();
        this.renderUpdated();
    }

    protected renderHtml() {
        this.shadowRoot!.innerHTML = `${this.css()}${this.html()}`;
    }

    /**
     * Se produit à chaque mise à jour d'une propriété qui provoque une mise à jour du rendu HTML du Shadow DOM
     * @protected
     */
    protected renderUpdated() {

    }

    /**
     * Renvoie le premier élément descendant du nœud qui correspond aux sélecteurs
     * @protected
     */
    protected queryShadowSelector<E extends Element = Element>(selectors: string): E | null {
        return this.shadowRoot!.querySelector(selectors);
    }
}

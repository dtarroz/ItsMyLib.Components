/**
 * Classe de base pour tous les éléments HTML personnalisés et son paramètre générique T représente tous les types de CustomEvent
 * que l'on peut distribuer sur cet élément.
 */
export class ImlHTMLElement<T extends string> extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    /**
     * Rendu HTML du Shadow DOM
     * 
     * @override test
     */
    protected html(): string {
        return '';
    }

    /**
     * Style CSS dans le Shadow DOM.
     * Ne pas oublier d'inclure la balise <style></style>.
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
     */
    protected renderUpdated() {

    }

    /**
     * Renvoie le premier élément descendant du nœud qui correspond aux sélecteurs
     */
    protected queryShadowSelector<E extends Element = Element>(selectors: string): E | null {
        return this.shadowRoot!.querySelector(selectors);
    }

    /**
     * Distribue un événement à la cible et renvoie true si la valeur de l'attribut cancelable est false ou si sa méthode PreventDefault()
     * n'a pas été invoquée, et false dans le cas contraire.
     *
     * @param type Le type d'évènement à distribuer
     * @param options Les caractéristiques de l'évènement
     */
    protected dispatchCustomEvent(type: T, options: { cancelable?: boolean, detail?: any } | undefined = undefined) {
        return this.dispatchEvent(new CustomEvent(type, { bubbles: true, ...options }));
    }

    /**
     * Attache une fonction à appeler chaque fois que l'évènement spécifié est envoyé à la cible.
     *
     * @param type Le type d'évènement à écouter
     * @param listener La fonction qui est appelée lorsqu'un évènement du type spécifié se produit
     * @param options Les caractéristiques de l'écouteur d'évènements
     */
    override addEventListener(type: T, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        super.addEventListener(type, listener, options);
    }
}

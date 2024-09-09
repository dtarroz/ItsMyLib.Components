import { ImlHTMLElement } from './iml-htmlelement.js';

interface PropertyAttribute {
    property: string;
    attribute: string;
}

const allPropertiesAttributesByClassName = new Map<string, PropertyAttribute[]>();

/**
 * Décorateur de classe pour définir le nom de la balise du tag du composant personnalisé à la classe
 *
 * @param tag Le nom de la balise du tag
 */
export function customElement(tag: string) {
    return <T extends { new(...params: any[]): ImlHTMLElement<string> }>(constr: T) => {
        const className = constr.prototype.constructor.name;

        if (!(constr.prototype instanceof ImlHTMLElement))
            throw new Error(`Illegal decorator '@customElement' on '${className}', only on class extends ImlHtmlElement`);

        // "class extends" used because the real properties are created in the class and not in the parent class, so I wrap the class to create them after the constructor
        const newClassImlHTMLElement = class extends constr {
            constructor(...args: any[]) {
                super(...args);
                const that: any = this;
                const propertiesAttributes = allPropertiesAttributesByClassName.get(className);
                if (propertiesAttributes) {
                    for (const propertyAttribute of propertiesAttributes) {
                        that[`_${propertyAttribute.property}`] = this.getAttribute(propertyAttribute.attribute)
                                                                 ?? that[propertyAttribute.property];
                        Object.defineProperty(this, propertyAttribute.property, {
                            get() {
                                return this[`_${propertyAttribute.property}`];
                            },
                            set(value) {
                                this[`_${propertyAttribute.property}`] = value;
                                this.render();
                            },
                            enumerable: true,
                            configurable: true
                        });
                    }
                }
                this.render();
            }
        };

        // "defineProperty" used because the constructor name was the name of the variable that contains the overriding class
        Object.defineProperty(newClassImlHTMLElement, 'name', { value: className });

        customElements.define(tag, newClassImlHTMLElement);
    };
}

/**
 * Décorateur de propriété pour associer l'attribut du même nom à la propriété
 * 
 * @param {string|null} attribute Le nom de l'attribut associé à la propriété, si différent du nom de la propriété, sinon null
 */
export function property(attribute: string | null = null) {
    return <T extends ImlHTMLElement<string>>(target: T, propertyKey: string) => {
        if (typeof (target as any)[propertyKey] === 'function')
            throw new Error(`Illegal decorator '@property' on '${propertyKey}', only on property`);

        const className = target.constructor.name;
        const propertyAttribute = { property: propertyKey, attribute: attribute ?? propertyKey };
        if (!allPropertiesAttributesByClassName.has(className))
            allPropertiesAttributesByClassName.set(className, [propertyAttribute]);
        else
            allPropertiesAttributesByClassName.get(className)!.push(propertyAttribute);
    };
}
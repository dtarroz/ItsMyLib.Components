import { ImlHTMLElement } from './iml-htmlelement.js';

interface PropertyOptions {
    changedCallback?: string | boolean;
}

interface PropertyAttribute {
    property: string;
    attribute: string;
    changedCallback: string;
}

const allPropertiesAttributesByClassName = new Map<string, PropertyAttribute[]>();

/**
 * Décorateur de classe pour définir le nom de la balise du tag du composant personnalisé à la classe
 *
 * @param tag Le nom de la balise du tag
 */
export function customElement(tag: string) {
    return <T extends { new(...params: any[]): ImlHTMLElement }>(constr: T) => {
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
                            set(newValue) {
                                const oldValue = this[`_${propertyAttribute.property}`];
                                this[`_${propertyAttribute.property}`] = newValue;
                                if (propertyAttribute.changedCallback)
                                    this[propertyAttribute.changedCallback](propertyAttribute.property, oldValue, newValue);
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
 * @param {PropertyOptions|null} options Les options de la propriété
 */
export function property(options: PropertyOptions | null = null) {
    return <T extends ImlHTMLElement>(target: T, propertyKey: string) => {
        if (typeof (target as any)[propertyKey] === 'function')
            throw new Error(`Illegal decorator '@property' on '${propertyKey}', only on property`);

        const className = target.constructor.name;
        const changedCallback = options?.changedCallback ?? 'render';
        const propertyAttribute = {
            property: propertyKey,
            attribute: toKebabCase(propertyKey),
            changedCallback: typeof changedCallback === 'string' ? changedCallback : ''
        };
        if (!allPropertiesAttributesByClassName.has(className))
            allPropertiesAttributesByClassName.set(className, [propertyAttribute]);
        else
            allPropertiesAttributesByClassName.get(className)!.push(propertyAttribute);
    };
}

function toKebabCase(text: string) {
    return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
import { Meta, StoryObj } from '@storybook/web-components';
import { Args, SBScalarType, SBType } from '@storybook/csf';

/**
 * Le composant d'interraction dans la documentation
 */
export type Control = 'object' | 'boolean' | 'check' | 'inline-check' | 'radio' | 'inline-radio' | 'select' | 'multi-select' | 'number'
                      | 'range' | 'file' | 'color' | 'date' | 'text';

/**
 * La documentation sur un slot d'un composant personnalisé
 */
export interface MetaSlot {
    /** Le nom de l'attribut */
    name: string;
    /** La description de l'attribut */
    description: string;
}

/**
 * La documentation sur un attribut d'un composant personnalisé
 */
export interface MetaAttribute {
    /** Le nom de l'attribut */
    name: string;
    /** La description de l'attribut */
    description: string;
    /** Le composant qui permet d'interragir avec l'attribut */
    control: Control;
    /** Les options du composant qui interagit avec l'attribut */
    options?: any[];
    /** Le type de données de l'attribut */
    type: SBType | SBScalarType['name'];
    /** La valeur par défaut de l'attribut */
    defaultValue?: any;
}

/**
 * La documentation sur un événement d'un composant personnalisé
 */
export interface MetaEvent {
    /** Le nom de l'événement  */
    name: string;
    /** La description de l'événement */
    description: string;
}

/**
 * La documentation sur une variable CSS d'un composant personnalisé
 */
export interface MetaCss {
    /** Le nom de la variable CSS  */
    name: string;
    /** La description de la variable CSS */
    description: string;
    /** La valeur par défaut de la variable CSS */
    defaultValue: string;
}

/**
 * La documentation sur une méthode d'un composant personnalisé
 */
export interface MetaMethod {
    /** Le nom de la méthode  */
    name: string;
    /** La description de la méthode */
    description: string;
}

/**
 * La documentation simplifiée d'un composant personnalisé
 */
export interface MetaData {
    /** Le tag du composant personnalisé */
    tag: string;
    /** La description du composant personnalisé */
    description: string;
    /** La liste des attributs du composant personnalisé */
    attributes?: MetaAttribute[];
    /** La liste des slots du composant personnalisé */
    slots?: MetaSlot[];
    /** La liste des méthodes */
    methods?: MetaMethod[];
    /** La liste des événements du composant personnalisé */
    events?: MetaEvent[];
    /** La liste des variables CSS */
    css?: MetaCss[];
}

/**
 * La description simplifiée d'une Story d'un composant personnalisé
 */
export interface StoryData {
    /** La documentation du composant personnalisé */
    meta: Meta;
    /** La description de la Story */
    description: string;
    /** La liste des attributs des composants personnalisés */
    items?: Args[];
    /** Contenu HTML avant les composants */
    htmlBefore?: string;
    /** Balise script */
    script?: string;
}

/**
 * Création d'une instance "Meta" pour Storybook à partir d'une instance de documentation simplifiée d'un composant personnalisé.
 * Permet de centraliser la création d'une instance "Meta" pour les web components.
 *
 * @param metaData La documentation simplifiée du composant personnalisé
 */
export function makeMeta(metaData: MetaData): Meta {
    return {
        component: metaData.tag,
        parameters: {
            docs: {
                description: {
                    component: `${metaData.description}

[Le code source du composant sur GitHub](https://github.com/dtarroz/ItsMyLib.Components/blob/main/src/components/${metaData.tag}.ts)`
                },
                toc: true
            },
            actions: {
                handles: (metaData.events ?? []).map(event => event.name)
            }
        },
        argTypes: {
            ...convertAttributes(metaData.attributes),
            ...convertSlots(metaData.slots),
            ...convertMethods(metaData.methods),
            ...convertProperties(metaData.attributes),
            ...convertEvents(metaData.events),
            ...convertCss(metaData.css)
        },
        args: {
            ...convertDefaultValues(metaData.attributes)
        }
    };
}

function convertAttributes(attributes: MetaAttribute[] | undefined) {
    return attributes?.reduce((acc, obj) => {
        acc[obj.name] = convertToAttributeArgType(obj);
        return acc;
    }, {} as { [name: string]: any });
}

function convertSlots(slots: MetaSlot[] | undefined) {
    return slots?.reduce((acc, obj) => {
        acc[obj.name] = convertToSlotArgType(obj);
        return acc;
    }, {} as { [name: string]: any });
}

function convertProperties(attributes: MetaAttribute[] | undefined) {
    return attributes?.reduce((acc, obj) => {
        if (obj.name.indexOf('-') > 0)
            acc[toCamelCase(obj.name)] = convertToPropertiesArgType(obj);
        return acc;
    }, {} as { [name: string]: any });
}

function convertEvents(events: MetaEvent[] | undefined) {
    return events?.reduce((acc, obj) => {
        acc[obj.name] = convertToEventArgType(obj);
        return acc;
    }, {} as { [name: string]: any });
}

function convertCss(css: MetaCss[] | undefined) {
    return css?.reduce((acc, obj) => {
        acc[obj.name] = convertToCssArgType(obj);
        return acc;
    }, {} as { [name: string]: any });
}

function convertMethods(css: MetaMethod[] | undefined) {
    return css?.reduce((acc, obj) => {
        acc[obj.name] = convertToMethodsArgType(obj);
        return acc;
    }, {} as { [name: string]: any });
}

function convertDefaultValues(attributes: MetaAttribute[] | undefined) {
    return attributes?.reduce((acc, obj) => {
        acc[obj.name] = obj.defaultValue;
        return acc;
    }, {} as { [name: string]: any });
}

function convertToAttributeArgType(attribute: MetaAttribute) {
    return {
        description: attribute.description,
        control: attribute.control,
        options: attribute.options,
        type: attribute.type,
        table: {
            category: 'Attributes',
            defaultValue: {
                summary: attribute.defaultValue?.toString()
            }
        }
    };
}

function convertToSlotArgType(slot: MetaSlot) {
    return {
        description: slot.description,
        control: 'text',
        type: 'string',
        table: {
            category: 'Slots',
            defaultValue: {
                summary: null
            }
        }
    };
}

function convertToPropertiesArgType(attribute: MetaAttribute) {
    return {
        description: attribute.description,
        control: false,
        type: attribute.type,
        table: {
            category: 'Properties',
            defaultValue: {
                summary: attribute.defaultValue?.toString()
            }
        }
    };
}

function convertToEventArgType(event: MetaEvent) {
    return {
        description: event.description,
        control: false,
        type: 'CustomEvent',
        table: {
            category: 'Events',
            defaultValue: {
                summary: null
            }
        }
    };
}

function convertToCssArgType(css: MetaCss) {
    return {
        description: css.description,
        control: 'text',
        type: 'string',
        table: {
            category: 'CSS Custom Properties',
            defaultValue: {
                summary: css.defaultValue
            }
        }
    };
}

function convertToMethodsArgType(method: MetaMethod) {
    return {
        description: method.description,
        control: false,
        type: 'function',
        table: {
            category: 'Methods'
        }
    };
}

/**
 * Création d'une instance "Story" pour Storybook.
 * Permet de centraliser la création d'une instance "Story" pour les web components.
 */
export function makeStory(storyData: StoryData): StoryObj {
    const renderStory = (args: Args, preview: boolean) => {
        const before = storyData.htmlBefore ?? '';
        const css = renderCss(storyData.meta, args);
        const primary = renderHtml(storyData.meta, args);
        const others = (storyData.items ?? []).slice(1).map(a => renderHtml(storyData.meta, a)) ?? [];
        const components = [primary, ...others].join(preview ? '\n' : '');
        const html = others.length > 0 && !preview ? `<div class="iml-sb-preview">${components}</div>` : components;
        const script = storyData.script ? `<script>${storyData.script}</script>` : '';
        return !preview ? `${before}${css}${html}${script}` : html;
    };
    return {
        render: (args: Args) => renderStory(args, false),
        args: storyData.items?.[0] ?? {},
        decorators: [(story, context) => {
            context.parameters.docs.source.code = renderStory(context.args, true);
            return story(context);
        }],
        parameters: {
            docs: {
                description: {
                    story: storyData.description
                }
            }
        }
    };
}

function renderHtml(meta: Meta, args: Args) {
    const attributes = Object.entries(args).map(([key, value]) => {
        return isAttribute(key, value) ? `${key}="${convertToValueAttribute(value)}"` : '';
    }).join(' ').trim();
    const slots = Object.entries(args).map(([key, value]) => isSlot(key, value) ? value : '').join('\n    ').trim();
    const tag = meta.component ?? '';
    const beforeAttributes = attributes ? ' ' : '';
    const beforeSlots = slots && slots[0] === '<' ? '\n    ' : '';
    const afterSlots = slots && slots[0] === '<' ? '\n' : '';
    return `<${tag}${beforeAttributes}${attributes}>${beforeSlots}${slots}${afterSlots}</${tag}>`;
}

function renderCss(meta: Meta, args: Args) {
    const tag = meta.component ?? '*';
    const css = Object.entries(args).map(([key, value]) => isCss(key, value) ? `${key}:${value};` : '').join('').trim();
    return css ? `<style>${tag}{${css}}</style>` : '';
}

function isAttribute(key: string, value: any) {
    return key[0] === '<' || key[0] === '>' ? false : value !== undefined;
}

function isSlot(key: string, value: any) {
    return key[0] === '<' || key[0] === '>' ? value !== undefined : false;
}

function isCss(key: string, value: any) {
    return key[0] === '-' && key[1] === '-' ? value : false;
}

function toCamelCase(text: string) {
    return text.split('-').map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function convertToValueAttribute(value: any) {
    if (typeof (value) == 'string')
        return value?.replace(/"/g, '&quot;');
    return value;
}
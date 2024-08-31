import { Meta, StoryObj } from '@storybook/web-components';
import { Args, SBScalarType, SBType } from '@storybook/csf';

/**
 * La documentation sur un événement d'un composant personalisé
 */
export interface MetaEvent {
    /** Le nom de l'événement  */
    name: string;
    /** La description de l'événement */
    description: string;
}

/**
 * Le composant d'interraction dans la documentation
 */
export type Control = 'object' | 'boolean' | 'check' | 'inline-check' | 'radio' | 'inline-radio' | 'select' | 'multi-select' | 'number'
                      | 'range' | 'file' | 'color' | 'date' | 'text';

/**
 * La documentation sur un attribut d'un composant personalisé
 */
export interface MetaAttribute {
    /** Le nom de l'attribut */
    name: string;
    /** La description de l'attribut */
    description: string;
    /** Le composant qui permet d'interragir avec l'attribut */
    control: Control;
    /** Le type de données de l'attribut */
    type: SBType | SBScalarType['name'];
    /** La valeur par défaut de l'attribut */
    defaultValue: string;
}

/**
 * La documentation simplifiée d'un composant personnalisé
 */
export interface MetaData {
    /** Le tag du composant personnalisé */
    tag: string;
    /** La description du composant personnalisé */
    description: string;
    /** La liste des événements du composant personnalisé */
    events?: MetaEvent[];
    /** La liste des attributs du composant personnalisé */
    attributes?: MetaAttribute[];
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
                    component: metaData.description ?? ''
                },
                toc: true
            },
            actions: {
                handles: (metaData.events ?? []).map(event => event.name)
            }
        },
        argTypes: {
            ...convertAttributes(metaData.attributes),
            ...convertEvents(metaData.events)
        }
    };
}

function convertAttributes(attributes: MetaAttribute[] | undefined) {
    return attributes?.reduce((acc, obj) => {
        acc[obj.name] = convertToControlArgType(obj);
        return acc;
    }, {} as { [name: string]: any });
}

function convertEvents(events: MetaEvent[] | undefined) {
    return events?.reduce((acc, obj) => {
        acc[obj.name] = convertToEventArgType(obj);
        return acc;
    }, {} as { [name: string]: any });
}

function convertToControlArgType(attribute: MetaAttribute) {
    return {
        description: attribute.description,
        control: attribute.control,
        type: attribute.type,
        table: {
            category: 'Attributes',
            defaultValue: {
                summary: attribute.defaultValue
            }
        }
    };
}

function convertToEventArgType(event: MetaEvent) {
    return {
        description: event.description,
        type: 'function',
        table: {
            category: 'Events'
        }
    };
}

/**
 * Création d'une instance "Story" pour Storybook.
 * Permet de centraliser la création d'une instance "Story" pour les web components.
 *
 * @param meta L'instance "Meta" de Storybook
 * @param description La description de la story pour la documentation
 * @param primaryAttributes Les attributs pour le composant personnalisé principal de la story
 * @param otherAttributes Les autres attributs s'il y a d'autres composants personnalisés dans la story
 */
export function makeStory(meta: Meta, description: string, primaryAttributes?: Args, otherAttributes?: Args[]): StoryObj {
    const renderStory = (args: Args, preview: boolean) => {
        const primary = renderHtml(meta, args);
        const others = otherAttributes?.map(a => renderHtml(meta, a)) ?? [];
        const components = [primary, ...others].join(preview ? '\n' : '');
        return others.length > 0 && !preview ? `<div style="display: flex; gap: 1em; width: 100%;">${components}</div>` : components;
    };
    return {
        render: (args: Args) => renderStory(args, false),
        args: primaryAttributes ?? {},
        decorators: [(story, context) => {
            context.parameters.docs.source.code = renderStory(context.args, true);
            return story(context);
        }],
        parameters: {
            docs: {
                description: {
                    story: description
                }
            }
        }
    };
}

function renderHtml(meta: Meta, args: Args) {
    const attributes = Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ');
    return `<${meta.component ?? ''}${attributes ? ' ' : ''}${attributes}></${meta.component ?? ''}>`;
}

import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-button.js';

const meta = makeMeta({
    tag: 'iml-button',
    description: 'Surcharge d\'un `<button>` avec différents modes et comportements',
    slots: [
        {
            name: '><',
            description: 'Le contenu du bouton'
        }
    ],
    attributes: [
        {
            name: 'mode',
            description: 'Le mode de rendu du bouton',
            control: 'radio',
            options: ['primary', 'secondary'],
            type: 'string',
            defaultValue: 'primary'
        },
        {
            name: 'redirectToUrl',
            description: 'L\'url de redirection après le clic sur le bouton, seulement si l\'événement n\'a pas été explicitement annulé',
            control: 'text',
            type: 'string'
        },
        {
            name: 'disabled',
            description: 'Le bouton est inactif si la valeur est égal à `true`',
            control: 'boolean',
            type: 'boolean'
        }
    ],
    events: [
        {
            name: 'iml-button:click',
            description: 'Evénement sur le clic du bouton'
        }
    ],
    css: [
        {
            name: '--iml-button-font-size',
            description: 'La taille du texte contenu dans le bouton',
            defaultValue: '0.91rem'
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export default { title: 'Atoms/<iml-button>', ...meta };

// noinspection JSUnusedGlobalSymbols
export const Modes = makeStory({
    meta: meta,
    description: 'Différents modes de rendu par défaut du bouton',
    items: [
        {
            '><': 'Primary'
        },
        {
            '><': 'Secondary',
            'mode': 'secondary'
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export const Disabled = makeStory({
    meta: meta,
    description: 'Différents modes de rendu du bouton inactif',
    items: [
        {
            '><': 'Primary',
            disabled: true
        },
        {
            '><': 'Secondary',
            'mode': 'secondary',
            disabled: true
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export const RedirectToUrl = makeStory({
    meta: meta,
    description: 'Redirection vers une url',
    items: [
        {
            '><': 'Avec redirection',
            redirectToUrl: 'https://github.com/dtarroz/ItsMyLib.Components'
        },
        {
            '><': 'Sans redirection',
            redirectToUrl: 'https://github.com/dtarroz/ItsMyLib.Components',
            disabled: true
        }
    ]
});

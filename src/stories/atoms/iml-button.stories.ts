import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-button.js';

const meta = makeMeta({
    tag: 'iml-button',
    description: 'Surcharge d\'un `<button>` avec différents modes et comportements',
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
            name: 'redirect-to-url',
            description: 'L\'url de redirection après le clic sur le bouton, seulement si l\'événement n\'a pas été explicitement annulé',
            control: 'text',
            type: 'string'
        },
        {
            name: 'status',
            description: 'L\'état du rendu du bouton',
            control: 'radio',
            options: ['active', 'inactive', 'disabled'],
            type: 'string',
            defaultValue: 'active'
        }
    ],
    slots: [
        {
            name: '><',
            description: 'Le contenu du bouton'
        }
    ],
    methods: [
        {
            name: 'click',
            description: 'Déclenche l\'événement `click` sur le bouton'
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
export const Active = makeStory({
    meta: meta,
    description: 'Différents modes de rendu du bouton actif',
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
export const Inactive = makeStory({
    meta: meta,
    description: 'Différents modes de rendu du bouton inactif',
    items: [
        {
            '><': 'Primary',
            'status': 'inactive'
        },
        {
            '><': 'Secondary',
            'mode': 'secondary',
            'status': 'inactive'
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export const Disabled = makeStory({
    meta: meta,
    description: 'Différents modes de rendu du bouton désactivé',
    items: [
        {
            '><': 'Primary',
            'status': 'disabled'
        },
        {
            '><': 'Secondary',
            'mode': 'secondary',
            'status': 'disabled'
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
            'redirect-to-url': 'https://www.google.fr'
        },
        {
            '><': 'Inactif',
            'redirect-to-url': 'https://www.google.fr',
            'status': 'inactive'
        },
        {
            '><': 'Désactivé',
            'redirect-to-url': 'https://www.google.fr',
            'status': 'disabled'
        }
    ]
});

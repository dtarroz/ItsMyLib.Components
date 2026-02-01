import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-confirm.js';

const meta = makeMeta({
    tag: 'iml-confirm',
    description: 'Boîte de confirmation modale',
    attributes: [
        {
            name: 'button-yes-caption',
            description: 'Le libelle du bouton de gauche (Oui)',
            control: 'text',
            type: 'string',
            defaultValue: 'Oui'
        },
        {
            name: 'button-yes-mode',
            description: 'Le mode de rendu du bouton de gauche (Oui)',
            control: 'text',
            type: 'string',
            defaultValue: 'primary'
        },
        {
            name: 'button-no-caption',
            description: 'Le libelle du bouton de droite (Non)',
            control: 'text',
            type: 'string',
            defaultValue: 'Non'
        },
        {
            name: 'button-no-mode',
            description: 'Le mode de rendu du bouton de droite (Oui)',
            control: 'text',
            type: 'string',
            defaultValue: 'secondary'
        },
        {
            name: 'header-title',
            description: 'Le titre de la boite de dialogue modale',
            control: 'text',
            type: 'string'
        },
        {
            name: 'size',
            description: 'La taille de la boite de dialogue modale',
            control: 'radio',
            options: ['x-small', 'small', 'large'],
            type: 'string',
            defaultValue: 'small'
        }
    ],
    slots: [
        {
            name: '><',
            description: 'Le contenu de la boite de confirmation modale'
        }
    ],
    methods: [
        {
            name: 'show',
            description: 'Affiche la boite de dialogue modale'
        }
    ],
    events: [
        {
            name: 'iml-confirm:confirm',
            description: 'Événement sur le choix Oui/Non de la boite de confirmation modale'
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export default { title: 'Dialogs/<iml-confirm>', ...meta };

// noinspection JSUnusedGlobalSymbols
export const Default = makeStory({
    meta: meta,
    description: 'Boite de confirmation',
    htmlBefore: '<iml-button>Cliquer moi</iml-button>',
    script: `
        document.querySelectorAll('iml-button').forEach((b) => b.addEventListener("click", () => {
            b.nextElementSibling.show();
        }));`,
    items: [
        {
            'header-title': 'Boite de dialogue de confirmation modale',
            '><': '<p style="display: flex; justify-content: center; align-items: center; height: 50px; color: #c6c6c6;">Message exemple</p>'
        }
    ]
});
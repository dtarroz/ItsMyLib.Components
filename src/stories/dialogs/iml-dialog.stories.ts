import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-dialog.js';
import '../../components/iml-button.js';

const meta = makeMeta({
    tag: 'iml-dialog',
    description: 'Boîte de dialogue modale',
    attributes: [
        {
            name: 'header-title',
            description: 'Le titre de la boite de dialogue modale',
            control: 'text',
            type: 'string'
        },
        {
            name: 'close-button',
            description: 'Affiche ou non le bouton de fermeture',
            control: 'boolean',
            type: 'boolean',
            defaultValue: true
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
            description: 'Le contenu de la boite de dialogue modale'
        }
    ],
    methods: [
        {
            name: 'show',
            description: 'Affiche la boite de dialogue modale'
        },
        {
            name: 'close',
            description: 'Ferme la boite de dialogue modale'
        }
    ],
    events: [
        {
            name: 'iml-dialog:show',
            description: 'Événement sur l\'affichage de la boite de dialogue modale'
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export default { title: 'Dialogs/<iml-dialog>', ...meta };

// noinspection JSUnusedGlobalSymbols
export const Default = makeStory({
    meta: meta,
    description: 'Boite de dialogue modale avec le bouton pour fermer',
    htmlBefore: '<iml-button>Cliquer moi</iml-button>',
    script: `
        document.querySelectorAll('iml-button').forEach((b) => b.addEventListener("click", () => {
            b.nextElementSibling.show();
        }));`,
    items: [
        {
            'header-title': 'Boite de dialogue modale',
            '><': '<p style="display: flex; justify-content: center; align-items: center; height: 50px; color: #c6c6c6;">Message exemple</p>'
        }
    ]
});
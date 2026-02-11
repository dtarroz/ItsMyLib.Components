import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-menu.js';
import '../../components/iml-icon.js';
import '../../components/iml-icon-pen.js';
import '../../components/iml-icon-trash.js';
import '../../components/iml-icon-share.js';

const meta = makeMeta({
    tag: 'iml-menu',
    description: 'Un menu d\'actions simple qui s\'ouvre au clic et émet `iml-menu:click` avec le nom de l\'action',
    attributes: [
        {
            name: 'icon',
            description: 'Le nom de l\'icône affichée sur le bouton d\'action',
            control: 'text',
            type: 'string',
            defaultValue: 'three-dots'
        },
        {
            name: 'actions',
            description: 'La liste des actions',
            control: 'object',
            type: 'string',
            defaultValue: JSON.stringify([
                { name: 'edit', caption: 'Éditer', icon: 'pen' },
                { name: 'delete', caption: 'Supprimer', icon: 'trash' },
                { name: 'share', caption: 'Partager', icon: 'share' }
            ])
        }
    ],
    methods: [
        {
            name: 'open',
            description: 'Ouvre le menu'
        },
        {
            name: 'close',
            description: 'Ferme le menu'
        }
    ],
    events: [
        {
            name: 'iml-menu:click',
            description: 'Evénement déclenché quand une action est sélectionnée (detail = nom de l\'action)'
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export default { title: 'Atoms/<iml-menu>', ...meta };

// noinspection JSUnusedGlobalSymbols
export const Default = makeStory({
    meta: meta,
    description: 'Menu d\'exemple avec trois actions.',
    items: [
        {
            'label': 'Actions',
            'actions': JSON.stringify([
                { name: 'edit', caption: 'Éditer', icon: 'pen' },
                { name: 'delete', caption: 'Supprimer', icon: 'trash' },
                { name: 'share', caption: 'Partager', icon: 'share' }
            ])
        }
    ],
    htmlBefore:'<style>iml-menu{ margin-left: 150px; margin-top: 150px; }</style>'
});

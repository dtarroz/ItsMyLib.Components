import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-icon.js';
import '../../components/iml-icon-arrow.js';
import '../styles/iml-icon.css';

const meta = makeMeta({
    tag: 'iml-icon',
    description: 'Icône',
    attributes: [
        {
            name: 'name',
            description: 'Le nom de l\'icône',
            control: 'select',
            options: ['arrow'],
            type: 'string',
            defaultValue: 'arrow'
        },
        {
            name: 'width',
            description: 'La largeur de l\'icône',
            control: 'number',
            type: 'number',
            defaultValue: '15'
        },
        {
            name: 'height',
            description: 'La hauteur de l\'icône',
            control: 'number',
            type: 'number',
            defaultValue: '15'
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export default { title: 'Icons/<iml-icon>', ...meta };

// noinspection JSUnusedGlobalSymbols
export const Default = makeStory({
    meta: meta,
    description: '',
    items: [
        {
            'name': 'arrow'
        }
    ]
});

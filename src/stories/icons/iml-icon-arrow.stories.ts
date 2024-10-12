import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-icon-arrow.js';
import '../styles/iml-icon.css';

const meta = makeMeta({
    tag: 'iml-icon-arrow',
    description: 'Icône flèche',
    attributes: [
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
export default { title: 'Icons/<iml-icon-arrow>', ...meta };

// noinspection JSUnusedGlobalSymbols
export const Default = makeStory({
    meta: meta,
    description: '',
    items: [
        {}
    ]
});

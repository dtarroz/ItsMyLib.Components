import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-icon-arrow.js';

const meta = makeMeta({
    tag: 'iml-icon-arrow',
    description: 'Icône flèche',
    attributes: [
        {
            name: 'style',
            description: 'L\'affichage de l\'icône est controlé par le CSS',
            control: 'text',
            type: 'string'
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
        {
            'style': 'display: block; width: 30px; height: 30px; fill: hsl(60, 94%, 42%);'
        }
    ]
});

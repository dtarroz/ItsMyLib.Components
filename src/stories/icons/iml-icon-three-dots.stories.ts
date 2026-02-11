import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-icon-three-dots.js';

const meta = makeMeta({
    tag: 'iml-icon-three-dots',
    description: 'Icône 3 points',
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
export default { title: 'Icons/<iml-icon-three-dots>', ...meta };

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

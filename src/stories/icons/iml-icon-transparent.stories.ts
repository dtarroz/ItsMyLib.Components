import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-icon-transparent.js';

const meta = makeMeta({
    tag: 'iml-icon-transparent',
    description: 'Icône transparent',
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
export default { title: 'Icons/<iml-icon-transparent>', ...meta };

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

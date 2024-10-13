import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-icon.js';
import '../../components/iml-icon-arrow.js';
import '../../components/iml-icon-search.js';
import '../../components/iml-icon-circle-plus.js';
import '../../components/iml-icon-filter.js';

const meta = makeMeta({
    tag: 'iml-icon',
    description: 'Icône',
    attributes: [
        {
            name: 'name',
            description: 'Le nom de l\'icône',
            control: 'select',
            options: ['arrow', 'search', 'circle-plus', 'filter'],
            type: 'string',
            defaultValue: 'arrow'
        },
        {
            name: 'style',
            description: 'L\'affichage de l\'icône est controlé par le CSS',
            control: 'text',
            type: 'string'
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export default { title: 'Icons/<iml-icon>', ...meta };

const style = 'display: block; width: 30px; height: 30px; fill: hsl(60, 94%, 42%);';

// noinspection JSUnusedGlobalSymbols
export const Default = makeStory({
    meta: meta,
    description: '',
    items: [
        {
            'name': 'arrow',
            'style': style
        },
        {
            'name': 'search',
            'style': style
        },
        {
            'name': 'circle-plus',
            'style': style
        },
        {
            'name': 'filter',
            'style': style
        }
    ]
});

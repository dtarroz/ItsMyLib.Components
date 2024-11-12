import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-icon.js';
import '../../components/iml-icon-arrow.js';
import '../../components/iml-icon-search.js';
import '../../components/iml-icon-circle-plus.js';
import '../../components/iml-icon-filter.js';
import '../../components/iml-icon-cross.js';
import '../../components/iml-icon-love.js';
import '../../components/iml-icon-like.js';
import '../../components/iml-icon-unlike.js';
import '../../components/iml-icon-transparent.js';
import '../../components/iml-icon-share.js';
import '../../components/iml-icon-pen.js';
import '../../components/iml-icon-trash.js';

const meta = makeMeta({
    tag: 'iml-icon',
    description: 'Icône',
    attributes: [
        {
            name: 'name',
            description: 'Le nom de l\'icône',
            control: 'select',
            options: ['arrow', 'search', 'circle-plus', 'filter', 'cross', 'love', 'like', 'unlike', 'transparent', 'share', 'pen', 'trash'],
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
        },
        {
            'name': 'cross',
            'style': style
        },
        {
            'name': 'love',
            'style': style
        },
        {
            'name': 'like',
            'style': style
        },
        {
            'name': 'unlike',
            'style': style
        },
        {
            'name': 'transparent',
            'style': style
        },
        {
            'name': 'share',
            'style': style
        },
        {
            'name': 'pen',
            'style': style
        },
        {
            'name': 'trash',
            'style': style
        }
    ]
});

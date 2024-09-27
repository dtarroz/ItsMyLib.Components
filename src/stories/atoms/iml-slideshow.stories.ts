import { makeMeta, makeStory } from '../lib/make-story.js';
import '../../components/iml-slideshow.js';
import '../styles/iml-slideshow.css';

const meta = makeMeta({
    tag: 'iml-slideshow',
    description: 'Surcharge d\'un `<img>` avec une fonctionnalité de diaporama',
    attributes: [
        {
            name: 'mode',
            description: 'Le mode de lecture du diaporama',
            control: 'radio',
            options: ['hover', 'autoplay'],
            type: 'string',
            defaultValue: 'hover'
        },
        {
            name: 'status',
            description: 'L\'état de lecture du diaporama',
            control: 'radio',
            options: ['active', 'inactive'],
            type: 'string',
            defaultValue: 'active'
        },
        {
            name: 'inactive-image-url',
            description: 'L\'url de l\'image lorsque le diaporama est inactif',
            control: 'text',
            type: 'string'
        },
        {
            name: 'image-urls',
            description: 'Les urls des images qui défilent lors du diaporama',
            control: 'object',
            type: 'string'
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export default { title: 'Atoms/<iml-slideshow>', ...meta };

const inactiveImageUrl = 'src/stories/assets/inactive-image.png';

const imageUrls = [
    'src/stories/assets/image1.png',
    'src/stories/assets/image2.png',
    'src/stories/assets/image3.png',
    'src/stories/assets/image4.png',
    'src/stories/assets/image5.png',
    'src/stories/assets/image6.png',
    'src/stories/assets/image7.png',
    'src/stories/assets/image8.png',
    'src/stories/assets/image9.png'
];

// noinspection JSUnusedGlobalSymbols
export const Hover = makeStory({
    meta: meta,
    description: 'Diaporamas activés au survol',
    items: [
        {
            'inactive-image-url': inactiveImageUrl,
            'image-urls': JSON.stringify(imageUrls)
        },
        {
            'inactive-image-url': inactiveImageUrl,
            'image-urls': JSON.stringify(imageUrls)
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export const Autoplay = makeStory({
    meta: meta,
    description: 'Diaporamas activés au survol',
    items: [
        {
            'mode': 'autoplay',
            'inactive-image-url': inactiveImageUrl,
            'image-urls': JSON.stringify(imageUrls)
        }
    ]
});

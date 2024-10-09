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
            name: 'default-image-url',
            description: 'L\'url par défaut de l\'image lorsque le diaporama est à l\'arrêt',
            control: 'text',
            type: 'string'
        },
        {
            name: 'image-urls',
            description: 'Les urls des images qui défilent lors du diaporama',
            control: 'object',
            type: 'string'
        },
        {
            name: 'loading',
            description: 'Mode de chargement des images',
            control: 'radio',
            options: ['lazy', 'eager'],
            type: 'string',
            defaultValue: 'lazy'
        }
    ],
    css: [
        {
            name: '--iml-slideshow-border-radius',
            description: 'La taille de la bordure de l\'image',
            defaultValue: '0'
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export default { title: 'Atoms/<iml-slideshow>', ...meta };

const defaultImageUrl = 'default-image.png';

const imageUrls = [
    'image1.png',
    'image2.png',
    'image3.png',
    'image4.png',
    'image5.png',
    'image6.png',
    'image7.png',
    'image8.png',
    'image9.png'
];

// noinspection JSUnusedGlobalSymbols
export const Hover = makeStory({
    meta: meta,
    description: 'Diaporamas activés au survol',
    items: [
        {
            'default-image-url': defaultImageUrl,
            'image-urls': JSON.stringify(imageUrls)
        },
        {
            'default-image-url': defaultImageUrl,
            'image-urls': JSON.stringify(imageUrls)
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export const Autoplay = makeStory({
    meta: meta,
    description: 'Diaporamas avec lecture automatique',
    items: [
        {
            'mode': 'autoplay',
            'default-image-url': defaultImageUrl,
            'image-urls': JSON.stringify(imageUrls)
        }
    ]
});

// noinspection JSUnusedGlobalSymbols
export const Inactive = makeStory({
    meta: meta,
    description: 'Diaporamas inactifs',
    items: [
        {
            'mode': 'hover',
            'status': 'inactive',
            'default-image-url': defaultImageUrl,
            'image-urls': JSON.stringify(imageUrls)
        },
        {
            'mode': 'autoplay',
            'status': 'inactive',
            'default-image-url': defaultImageUrl,
            'image-urls': JSON.stringify(imageUrls)
        }
    ]
});

const imageWithErrorUrls = [...imageUrls];
imageWithErrorUrls[2] = '404.png';

// noinspection JSUnusedGlobalSymbols
export const ImageError = makeStory({
    meta: meta,
    description: 'Diaporamas avec des images en erreur',
    items: [
        {
            'default-image-url': defaultImageUrl,
            'image-urls': JSON.stringify(imageWithErrorUrls)
        },
        {
            'default-image-url': '404.png',
            'image-urls': JSON.stringify(imageUrls)
        },
        {
            'mode': 'autoplay',
            'default-image-url': defaultImageUrl,
            'image-urls': JSON.stringify(imageWithErrorUrls)
        }
    ]
});

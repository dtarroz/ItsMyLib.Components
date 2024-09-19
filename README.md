# ItsMyLib.Components

Une bibliothèque de composants (Web Components) pour vos applications Web

[Lien vers le storybook](https://dtarroz.github.io/ItsMyLib.Components/)

## Sommaire

- [Pourquoi faire ?](#pourquoi-faire-)
- [Getting Started](#getting-started)
- [Utiliser les Tags Helpers](#utiliser-les-tags-helpers)

## Pourquoi faire ?

Vous aller pouvoir utiliser une bibliothèque de composants (Web Components) dans vos applications web.
- Elle est compatible avec tous les Frameworks Front.
- Elle est compatible pour les projets avec Javascript ou Typescript.
- Un fichier dll spécifique existe pour les projets utilisant la syntaxe Razor sur des fichiers `.cshtml`.
- Une documentation Storybook référence tous les composants disponibles avec leurs attributs et leurs événements personnalisés.

## Getting Started

1. Vous devez télécharger la derniére version disponible ([lien direct ici](https://github.com/dtarroz/ItsMyLib.Components/releases/latest/download/publish.zip))
2. Décompresser le fichier zip téléchargé.
3. Le contenu du répertoire `dist` contient les fichiers `js` et `d.ts` que vous devez intégrer dans votre projet _(par exemple dans `wwwroot/lib`pour un projet .Net)_.
4. Pour utiliser un composant, par exemple le bouton, vous devez importer le fichier `itsmylib.components/iml-button.js` dans votre fichier js/ts
```js
// Un import direct
import '../lib/itsmylib.components/iml-button.js';

// Un import avec le nom de la classe si vous avez besoin de l'élément HTML en JS/TS
import { ImlButton } from '../lib/itsmylib.components/iml-button.js';
```
5. Dans votre html associé, vous déclarez la balise de l'élément HTML du bouton
```html
<iml-button>Mon bouton</iml-button>
```

## Utiliser les Tags Helpers

Pour un projet .Net, vous avez la possibilité d'utiliser les Tags Helpers qui donne une aide visuelle pour la saisie des balises HTML dans vos fichiers `.cshtml`.

[En cours de construction]

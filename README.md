# ItsMyLib.Components

Une bibliothèque de Web Components modulaires et réutilisables pour améliorer vos applications Web.

[Lien vers le storybook](https://dtarroz.github.io/ItsMyLib.Components/)

## Sommaire

- [Pourquoi utiliser cette bibliothèque ?](#pourquoi-utiliser-cette-bibliothèque-)
- [Getting Started](#getting-started)
- [Utiliser les Tag Helpers dans un projet .NET](#utiliser-les-tag-helpers-dans-un-projet-net)

## Pourquoi utiliser cette bibliothèque ?

Cette bibliothèque de Web Components vous permet d'intégrer facilement des composants réutilisables dans vos applications web, avec de nombreux avantages :

- **Compatibilité universelle** : Fonctionne avec tous les frameworks front-end (Vue, React, Angular, Vanilla, etc.).
- **Support JavaScript et TypeScript** : Utilisable dans des projets écrits en JavaScript ou TypeScript.
- **Intégration Razor** : Un fichier DLL spécifique est fourni pour les projets ASP.NET utilisant la syntaxe Razor dans les fichiers `.cshtml`.
- **Documentation complète** : Une documentation Storybook accompagne la bibliothèque, listant tous les composants disponibles, ainsi que leurs attributs et événements personnalisés.

## Getting Started

1. **Télécharger la dernière version :** Récupérez la version la plus récente de la bibliothèque via ce [lien direct](https://github.com/dtarroz/ItsMyLib.Components/releases/latest/download/publish.zip).
2. **Décompresser l'archive** : Extrayez le fichier `.zip` que vous venez de télécharger.
3. **Intégrer les fichiers dans votre projet** : Le dossier `dist` contient les fichiers nécessaires (`.js` et `.d.ts`). Copiez ces fichiers dans votre projet, par exemple dans `wwwroot/lib` si vous travaillez sur un projet .NET.
4. **Importer un composant** : Pour utiliser un composant comme le bouton, vous devez importer le fichier `itsmylib.components/iml-button.js` dans votre fichier JavaScript ou TypeScript.
   
Exemple d'import direct dans un fichier JS/TS :
```js
// Import direct du fichier du composant
import '../lib/itsmylib.components/iml-button.js';

// Import avec la classe, si vous avez besoin de manipuler l'élément dans votre code
import { ImlButton } from '../lib/itsmylib.components/iml-button.js';
```
5. **Utiliser le composant dans votre HTML :** Une fois le fichier importé, vous pouvez utiliser le composant dans votre code HTML en ajoutant simplement la balise correspondante.
```html
<iml-button>Mon bouton</iml-button>
```

## Utiliser les Tag Helpers dans un projet .NET

Dans un projet .NET, vous avez la possibilité d'utiliser des Tag Helpers, qui facilitent l'écriture des balises HTML dans vos fichiers `.cshtml` en proposant de l'aide à la saisie.

1. **Ajouter la référence à la DLL** : Dans votre projet .NET, ajoutez une référence à la bibliothèque `ItsMyLib.Components.TagHelpers.dll`, disponible dans le répertoire `taghelpers` de l'archive téléchargée.
2. **Configurer les imports** : Ouvrez le fichier `Views/_ViewImports.cshtml` et ajoutez les lignes suivantes pour activer les Tag Helpers dans votre projet :
```cshtml
@using ItsMyLib.Components.TagHelpers
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers  // <-- Ligne par défaut
@addTagHelper *, ItsMyLib.Components.TagHelpers
```

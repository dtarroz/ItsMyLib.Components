# ItsMyLib.Components

Une bibliothèque de Web Components modulaires et réutilisables pour améliorer vos applications Web.

[Accéder au Storybook](https://dtarroz.github.io/ItsMyLib.Components/)

## Sommaire

- [Pourquoi utiliser cette bibliothèque ?](#pourquoi-utiliser-cette-bibliothèque-)
- [Premiers pas](#premiers-pas)
- [Utilisation des Tag Helpers dans un projet .NET](#utilisation-des-tag-helpers-dans-un-projet-net)

## Pourquoi utiliser cette bibliothèque ?

`ItsMyLib.Components` offre des Web Components réutilisables, avec de nombreux avantages pour vos applications web :

- **Compatibilité universelle** : Fonctionne avec tous les frameworks front-end (Vue, React, Angular, Vanilla JS, etc.).
- **Support JavaScript et TypeScript** : Compatible avec des projets en JavaScript ou TypeScript.
- **Intégration Razor** : Inclut un fichier DLL spécifique pour les projets ASP.NET utilisant Razor dans les fichiers `.cshtml`.
- **Documentation complète** : Une documentation Storybook liste tous les composants disponibles, leurs attributs et événements personnalisés.

## Premiers pas

1. **Télécharger la dernière version** : Récupérez la version la plus récente via ce [lien direct](https://github.com/dtarroz/ItsMyLib.Components/releases/latest/download/publish.zip).
2. **Décompresser l'archive** : Extrayez le fichier `.zip` téléchargé.
3. **Intégrer les fichiers dans votre projet** : Copiez les fichiers du dossier `dist` (par exemple, dans `wwwroot/lib` pour un projet .NET). Ce dossier contient les fichiers nécessaires (`.js` et `.d.ts`).
4. **Importer un composant** : Pour utiliser un composant, comme le bouton, importez le fichier `itsmylib.components/iml-button.js` dans votre fichier JavaScript ou TypeScript.
   
Exemple d'import direct dans un fichier JS/TS :
```js
// Import direct du fichier du composant
import '../lib/itsmylib.components/iml-button.js';

// Import avec la classe, si vous avez besoin de manipuler l'élément dans votre code
import { ImlButton } from '../lib/itsmylib.components/iml-button.js';
```
5. **Utiliser le composant dans l'HTML :** Après importation, utilisez le composant dans votre code HTML via sa balise.
```html
<iml-button>Mon bouton</iml-button>
```

## Utilisation des Tag Helpers dans un projet .NET

Dans un projet .NET, vous pouvez utiliser les Tag Helpers pour simplifier l'écriture des balises HTML dans les fichiers `.cshtml`, grâce à l'auto-complétion.

1. **Ajouter la référence à la DLL** : Ajoutez une référence à `ItsMyLib.Components.TagHelpers.dll`, située dans le répertoire `taghelpers` de l'archive téléchargée.
2. **Configurer les imports** : Dans `Views/_ViewImports.cshtml`, ajoutez ces lignes pour activer les Tag Helpers :
```cshtml
@* Pour utiliser les valeurs fixes des attributs *@
@using ItsMyLib.Components.TagHelpers

@* Ligne par défaut *@
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

@* Ajout des Tag Helpers de la bibliothèque *@
@addTagHelper *, ItsMyLib.Components.TagHelpers
```

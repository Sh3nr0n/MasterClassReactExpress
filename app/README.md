# Etapes  exercice #2 : Créer les requêtes d'affichage, d'insertion, de modification et de suppression des images

## Connexion à la base de données

Dans **app.js** ajouter les lignes suivantes pour établir la connexion à la base:

        // IMPORTANT - database connection
       var mongoose = require('mongoose');
       mongoose.connect('mongodb://localhost/masterclass');
       
       var db = mongoose.connection;
       db.on('error', console.error.bind(console, 'connection error:')); // Log possible connection errors to the database
       db.once('open', function() {
           // You can write code directly inside this block but it is best practice to keep your API calls in separated modules
       });

## Créer un **schema** avec **Mongoose**

Dans Mongoose tout part d'un **Schema**. Chaque schéma correspond à une collection et définit la forme des documents de cette collection. Une collection est l'équivalent d'une table dans une base de donées relationnelle.

http://mongoosejs.com/docs/guide.html


 - Créer un dossier **schema**
 - Créer un fichier **schemaImage.js** qui va recevoir le schéma:

 Importer Mongoose et créer un nouveau schéma

       var mongoose = require('mongoose');
       var Schema = mongoose.Schema
       
Définir un schéma, pour rappel : c'est la forme du document dans une collection mongoDB. Spécifier le type de données pour chaque paramètre
       
       var ImageSchema = new Schema({
           imageSrc: String, // Input data types
           description: String
           },{
           collection:'Image'//Collection name
           }
       );
**Important :** si aucun nom de collection n'est spécifié dans le schéma, MongoDB créera automatiquement une collection dans laquelle stocker les données.
       
Pour utiliser ce schéma, il faut convertir notre  "**ImageSchema**" en un **modèle** avec lequel on peu travailler :
       
       var Image = mongoose.model('Image', ImageSchema);
       
       module.exports = Image;


# Etapes  exercice #2 : Créer les requêtes d'affichage, d'insertion, de modification et de suppression des images dans une base de données

## Au préalable copier le dossier dans lequel la partie front-end a été réalisée et le renommer "client"

## Paramétrer les serveurs node (back-end et front-end)

 - Ouvrir le fichier **package.json** à la racine du projet et entrer la ligne de code suivante pour que le serveur back-end se lance sur un port différent de l'application React :

        {
          "name": "app",
          "version": "0.0.0",
          "private": true,
          "scripts": {
            "start": "PORT=3001 node ./bin/www" // <= ligne à    ajouter
          },

- Dans le fichier **client/package.json**, ajouter la ligne suivante pour que le server front-end communique avec le back-end :

      {
        "scripts": {
          "start": "react-scripts start",
          "build": "react-scripts build",
          "test": "react-scripts test --env=jsdom",
          "eject": "react-scripts eject"
        },
        "proxy": "http://localhost:3001" // <= ligne à  ajouter
      }


## Connexion à la base de données

- Dans **app.js** ajouter les lignes suivantes pour établir la connexion à la base :

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


 - Créer un dossier **/schema**
 - Créer un fichier **schemaImage.js** qui va recevoir le schéma

 - Importer Mongoose et créer un nouveau schéma.

       var mongoose = require('mongoose');
       var Schema = mongoose.Schema
       
- Définir un schéma. Pour rappel : c'est la forme du document dans une **collection** mongoDB. Spécifier le **type de données** pour chaque paramètre.
       
       var ImageSchema = new Schema({
           imageSrc: String, // Input data types
           description: String
           },{
           collection:'Image'//Collection name
           }
       );
**/!\ Important :** si aucun nom de collection n'est spécifié dans le schéma, MongoDB créera automatiquement une collection dans laquelle stocker les données.
       
Pour utiliser ce schéma, il faut convertir notre  "**ImageSchema**" en un **modèle** avec lequel on peut travailler :
       
       var Image = mongoose.model('Image', ImageSchema);
       
       module.exports = Image;

## Créer une requête de type GET pour afficher des images

 - Dans le dossier **routes**, créer un fichier **getImages.js**
 
       var express = require('express');
       var router = express.Router(); // The router.METHOD() methods provide the routing functionality in Express, where METHOD is one  of the HTTP methods, such as GET, PUT, POST, and so on, in lowercase. Thus, the actual methods are router.get(), router.post(), router.put(), and so on.
       var Image = require('../schema/schemaImage')

       router.get('/', async function(req, res, next) { 
         console.log('getImage.js : Got a Get request')
         Image.find({}, function(err, images) {
             
           if (err) { return next(err) }
           console.log('image list : ', images);
           return res.json(images);
         });
       });

### router.get( ... )

L'appel aux méthodes de type **router.METHOD()** fournit une fonctionnalité de routage intégrée à **Express JS**, où **METHOD** est une des méthodes  HTTP, telles que GET, PUT, POST, etc... (en minuscules).
On peut faire appel à ces méthodes de la façon suivante :  router.get(), router.post(), router.put(), etc...
Le premier argument **'/'** n'est pas pris en compte lorsqu'on fait appel à des requêtes internes à l'application. Par exemple une requête effectuée avec  "**GET/**" retournera la même route qu'une requête effectuée avec "**GET/?name=tobi**"

https://expressjs.com/en/api.html

### async function() { ... }

L'utilisation de **async** signifie que l'on fait appel à une fonction asynchrone pour récupérer le résultat d'une promesse (ou "**promise**") provenant de la requête **Image.find()**. Récupérer des images en ligne ou depuis un serveur peut prendre un certain temps, la donnée n'est donc pas disponible immédiatement. "Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais".

https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise

### Image.find({ ... })
La requête **find()** recherche tous les objets dans la base de données et s'appuie sur le modèle qu'on lui a fourni : "**Image**".

http://mongoosejs.com/docs/guide.html

 - Ajouter la route dans **app.js**


       var getImagesRouter = require('./routes/getImages');
       app.use('/getImages', getImagesRouter);

On paramètre ici le chemin vers notre route. Ce chemin est celui qui va être utilisé par le front-end REACT pour appeler la requête via la méthode **fetch()**.

 - Importer la partie front réalisée lors de l'exercice #1 dans le dossier **/client**

 - Ajouter la méthode suivante au composant qui contrôle l'affichage de votre liste d'image côté front-end:

        componentDidMount() {
         fetch('/getImages')
           .then(res => res.json())
           .then(images => this.setState({ imageList:  images     }))
       }

Cette méthode, disponible pour tout les composants créés à partir du composant React de base (*class MaClasse extends Component*), permet d'attendre que le composant ait été chargé dans la page avant d'effectuer la requête. Sans cette méthode la page apparaît vierge.

 - Simuler un objet à passer depuis **getImage.js** vers le composant React.

A vous de jouer !

## Créer une requête de type POST pour ajouter une image

 - Créer le fichier **postImage.js**

       var express = require('express');
       var router = express.Router();
       var Image = require('../schema/schemaImage');
       
       router.post('/', function(req, res, next) {
           console.log('postImage.js : Got a Post request')

           var image = new Image({ // Create an instance of the schemaImage model

               imageSrc: req.body.imageSrc, // Pass the req.body parameters
               description: req.body.desc
             })
             console.log('imageSrc is %s and description is %s',req.body.imageSrc,req.body.desc )
             image.save(function (err, postedResult) {
               if (err) { return next(err) }
             })
           res.send();
       })

       module.exports = router;
 
 - Ajouter la route dans **app.js**
 
 A vous de jouer !

 - Implémenter la requête dans React


            <Form onSubmit={this.handleImageSubmit} error>
              <Form.Field>
                <label>URL</label>
                <input 
                  placeholder="Entrez l'URL de l'image" 
                  value={this.state.imageSrc}
                  onChange={this.handleUrlChange}
                />
              </Form.Field>
              <Form.Field>
                <label>description</label>
                <input 
                  placeholder="Entrez une description" 
                  value={this.state.desc}
                  onChange={this.handleDescriptionChange}
                />
              </Form.Field>
              <Button type="submit" floated="right">
                Valider
              </Button>
            </Form>

Dans cette partie, on modifie le formulaire du composant **Modal** qui permet de saisir des images. La valeur des input est stockée dans le **state** du composant. On passe ensuite une méthode **onChange()** à l'input qui permet d'enregistrer les valeurs entrées par l'utilisateur à chaque changement.

 - Implémenter les métodes associées :

       handleUrlChange = (event) => {
         this.setState({
           imageSrc:event.target.value
         })
       }
     
       handleDescriptionChange = (event) => {
         this.setState({
           desc:event.target.value
         })
       }

On utilise ici les **event listeners** (écouteurs d'événements) pour enregistrer la valeur dans le **state** du composant.

https://www.computerhope.com/jargon/e/event-listener.htm

 - Ajouter le **state** correspondant dans le composant parent :

        constructor(props) {
            super(props);
            this.state = {
              imageSrc:'', // The initial state value is en empty string
              desc:'',
            };
          }

 - Créer une méthode qui affiche les images dans la vue :

       fetchImages() {
         fetch('/getImages')
         .then(res => res.json())
         .then(images => this.setState({ imageList: images }))
       };

La méthode **fetch()** va aller "chercher" la route correspondante (paramétrée dans **app.js**).

 - Modifier la méthode qui envoie les données au clic sur le bouton "**Valider**" du formulaire :

       handleImageSubmit = () => {
         console.log('Form has been submitted, image src is : %s and desc is : %s',this.state.imageSrc,    this.state.desc)
     
         fetch('/postImage', { 
           method: 'POST', // Define the HTTP method to use
           body: JSON.stringify({ // Body of the request
             imageSrc: this.state.imageSrc, // Parameters passed from the state
             desc: this.state.desc
           }),
           headers: {"Content-Type": "application/json"} // Header of the request (mandatory)
         })
         .then(console.log('JSON sent to server', // Check what has been sent
           JSON.stringify({
             imageSrc: this.state.imageSrc,
             desc: this.state.desc
           })
         ))
         .then(this.fetchImages())// Re-render the image list in the view
         .then(this.setState({ openModal: false,}))// Close Modal
       };


## Créer une requête de type PUT pour modifier une image

 - Créer le fichier **putImage.js**

       var express = require('express');
       var router = express.Router();
       var Image = require('../schema/schemaImage');
       
       router.put('/', function(req, res, next) {
           console.log('putImage.js : Got a Put request for image id:',req.body.id)
           Image.findOneAndUpdate(
             {
               _id: req.body.id // Search query
             },
             {
               imageSrc: req.body.imageSrc,
               description: req.body.desc // fields:values to update
             },
           )
           .then(doc => console.log('Request parameters are %s and %s', req.body.imageSrc,req.body.desc ))
           .catch(err => {console.error(err)})
           
           res.send();
       })

       module.exports = router;

La méthode **findOneAndUpdate()** accepte deux paramètres : l'identifiant de l'image à mettre à jour et les valeurs à modifier en base.

A vous de jouer!

 - Ajouter la route dans **app.js**

 - Implémenter la requête dans React


**tips* : Voici quelques étapes qui pourront vous aider

 - Dans le composant **Modal** qui affiche une image : créer un bouton  ouvrant un formulaire
 - Le formulaire est dans un composant **Modal** et possède deux **input** :un premier pour modifier l'URL et un second pour la description de l'image
 - Au clic sur ce bouton, il faut récupérer les informations de l'image (identifiant, url, description), les envoyer dans le **state** du composant parent et ouvrir le formulaire (qui est dans un composant **Modal**). 
 
 Il y a une subtilité de React pour passer des arguments à une fonction avec un événement de type "**onClick**". La ligne suivante fait intervenir une fontion fléchée "**() => {//instructions}**" dans laquelle on passe une méthode acceptant les arguments que l'on souhaite passer. Sans cela la méthode est exécutée au chargement de la page et peut entraîner des boucles infinies.

       onClick={() => {this.handleEditImage(image._id, image.imageSrc, image.description)}}

 - Créer un nouveau composant **Modal** qui va recevoir le formulaire d'édition.  
 - A l'image du composant d'ajout d'images, le composant d'édition a besoin de plusieurs méthodes pour fonctionner : une méthode pour ouvrir le composant, une méthode pour le fermer, deux méthodes pour enregistrer les valeurs des inputs (une pour chaque input) et enfin une méthode pour valider et envoyer les informations saisies.

 Les informations requises pour une requête de type **PUT** sont les mêmes que pour une requête de type **POST**. Pensez cependant à passer l'identifiant de l'image à modifier dans le corps de la requête.
 
## Créer une requête de type DELETE pour supprimer une image

A vous de jouer!

 - Créer le fichier **deleteImage.js**

**tips* : Utiliser la méthode **deleteOne()**

 - Ajouter la route dans **app.js** 
 
 - Implémenter un bouton de suppression et sa méthode associée

 **tips* : Comme pour la requête de type **PUT** vous aurez également besoin d'utiliser une fonction fléchée.

 - Implémenter la requête dans React

 ## Un outil à tester :

 Durant ces deux jours, vous venez d'utiliser un ensemble de logiciels/frameworks appelé MERN : MongoDB, Express, React, Node.

 Il existe un outil proposant une installation et un paramétrage clé en main pour développer des application React en utilisant une architecture de type MERN. 

 mern-starter : https://github.com/Hashnode/mern-starter
 

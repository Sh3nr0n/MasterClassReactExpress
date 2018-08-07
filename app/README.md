# Etapes  exercice #2 : Créer les requêtes d'affichage, d'insertion, de modification et de suppression des images

## Paramétrer les serveurs node (back-end et front-end)

 - Aller dans le fichier **package.json** à la racine du dossier

 Dans le **package.json** entrer la ligne de code suivante pour que le serveur back-end se lance sur un port différent de l'application React :

     {
       "name": "app",
       "version": "0.0.0",
       "private": true,
       "scripts": {
         "start": "PORT=3001 node ./bin/www" // <= ligne à ajouter
       },

Dans le fichier **client/package.json**, ajouter la ligne suivante pour que le server front-end communique avec le back-end :

     {
       "scripts": {
         "start": "react-scripts start",
         "build": "react-scripts build",
         "test": "react-scripts test --env=jsdom",
         "eject": "react-scripts eject"
       },
       "proxy": "http://localhost:3001" // <= ligne à ajouter
     }


## Connexion à la base de données

Dans **app.js** ajouter les lignes suivantes pour établir la connexion à la base :

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
 - Créer un fichier **schemaImage.js** qui va recevoir le schéma :

 Importer Mongoose et créer un nouveau schéma.

       var mongoose = require('mongoose');
       var Schema = mongoose.Schema
       
Définir un schéma, pour rappel : c'est la forme du document dans une collection mongoDB. Spécifier le type de données pour chaque paramètre.
       
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

## Créer une requête de type GET pour afficher des images

 - Dans le dossier **routes**, créer un fichier **getImages.js**

       router.get('/', async function(req, res, next) { 
         console.log('getImage.js : Got a get request')
         Image.find({}, function(err, images) {
             
           if (err) { return next(err) }
           console.log(images);
           return res.json('image list : ',images);
         });
       });

L'appel aux méthodes de type **router.METHOD()** fournit une fonctionnalité de routage intégrée à **Express JS**, où **METHOD** est une des méthodes  HTTP, telles que GET, PUT, POST, etc... (en minuscules).
On peut faire appel à ces méthodes de la façon suivante :  router.get(), router.post(), router.put(), etc...
Le premier argument **'/'** n'est pas pris en compte lorsqu'on fait appel à des requêtes internes à l'application. Par exemple une requête effectuée avec  "**GET/**" retournera la même route qu'une requête effectuée avec "**GET/?name=tobi**"

L'uilisation de **async** signifie que l'on fait appel à une fonction asynchrone pour récupérer le résultat de la promesse (ou "**promise**") provenant de la requête **Image.find()** (Récupérer des images en ligne ou depuis un serveur peut prendre un certain temps)

La requête **Image.find()** recherche tous les objets dans la base de données et s'appuie sur le modèle qu'on lui a fourni.

 - Ajouter la route dans **app.js**


       var getImagesRouter = require('./routes/getImages');
       app.use('/getImages', getImagesRouter);

On paramètre ici le chemin vers notre route. Ce chemin est celui qui va être utilisé par le front-end REACT pour appeler la requête via la méthode **fetch**.

 - Importer la partie front réalisée lors de l'exercice #1 dans le dossier **/client**

 - Ajouter la méthode suivante au composant qui contrôle l'affichage de votre liste d'image côté front-end:

        componentDidMount() {
         fetch('/getImages')
           .then(res => res.json())
           .then(images => this.setState({ imageList:  images     }))
       }

Cette méthode, disponible pour tout les composants créés à partir du composant React de base (*class MaClasse extends Component*), permet d'attendre que le composant ait été chargé dans la page avant d'effectuer la requête. Sans cette méthode la page serait potentiellement vierge.

 - Simuler un objet à passer depuis **getImage.js** vers le composant React.

## Créer une requête de type POST pour ajouter une image

 - Créer le fichier **postImage.js**

       var express = require('express');
       var router = express.Router();
       var Image = require('../schema/schemaImage');
       
       router.post('/', function(req, res, next) {
           console.log('postImage.js : Got a post request')

           var image = new Image({ // Create an instance of the schemaImage model

               imageSrc: req.body.imageSrc, // Pass the req.body parameters
               description: req.body.desc
             })
             console.log('imageSrc is %s and description is %s',        req.body.imageSrc,req.body.desc )
             image.save(function (err, postedResult) {
               if (err) { return next(err) }
             })
           res.send();
       })

module.exports = router;
 
 - Ajouter la route dans app.js
 
 A vous de jouer

 - Implémenter la requête dans React

Modifier le formulaire de la modale de saisie des images de manière à ce que la valeur des input soit mise à jour par le **state** du composant. Passer une méthode **onChange()** à l'input pour stocker les valeurs entrées par l'utilisateur.

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


Ajouter le **state** correspondant dans le composant parent :

     constructor(props) {
         super(props);
         this.state = {
           imageSrc:'',
           desc:'',
         };
       }

Créer une méthode qui affiche les images dans la vue :

       fetchImages() {
         fetch('/getImages')
         .then(res => res.json())
         .then(images => this.setState({ imageList: images }))
       };

Modifier la méthode qui envoie les données au clic sur le bouton "**Valider**" du formulaire :

    handleImageSubmit = () => {
      console.log('Form has been submitted, image src is : %s and desc is : %s',  this.state.imageSrc, this.state.desc)
  
      fetch('/postImage', { 
        method: 'POST', // Define the HTML method to use
        body: JSON.stringify({ // Body of the request
          imageSrc: this.state.imageSrc, // Parameters passed from the state
          desc: this.state.desc
        }),
        headers: {"Content-Type": "application/json"} // Header of the request
      })
      .then(console.log('JSON sent to server', // Check what has been sent
        JSON.stringify({
          imageSrc: this.state.imageSrc,
          desc: this.state.desc
        })
      ))
      .then(this.fetchImages())// Re-render the image list in   the view
      .then(this.setState({ openModal: false,}))// Close Modal
    };


## Créer une requête de type UPDATE pour modifier une image

 - Créer le fichier **updateImage.js**
 - Ajouter la route dans app.js (/!\ ne pas donner le code)
 - Implémenter la requête dans React (Ajouter le bouton dans la première modale, Créer une nouvelle modale avec son jeu de méthodes)


## Créer une requête de type DELETE pour supprimer une image

 - Créer le fichier **deleteImage.js**
 - Ajouter la route dans app.js (/!\ ne pas donner le code)
 - Implémenter la requête dans React (Ajouter le bouton dans la première modale)

 ## Un framework à tester :

 mern-starter : https://github.com/Hashnode/mern-starter
 

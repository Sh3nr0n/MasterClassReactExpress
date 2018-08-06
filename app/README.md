# Etapes  exercice #2 : Créer les requêtes d'affichage, d'insertion, de modification et de suppression des images

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

 - Dans le dossier **routes**, créer un fichier **getimages.js**

       router.get('/', async function(req, res, next) { 
       
         Image.find({}, function(err, images) {
             
           if (err) { return next(err) }
           console.log(images);
           return res.json(images);
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




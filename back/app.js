const express = require('express');
const bodyParser = require('body-parser')


const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')
const path = require('path')

// connexion à la base de donnée

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://SuperAdmin:VeryComplicatedBecauseItsCool94400@mycluster.csty8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Démarage de l'application express

const app = express();

// configuration CORS

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());

// Différentes routes utilisé

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;
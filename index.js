//REQUIRING MODULES

var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');

//INSTANCING EXPRESS, MAKING IT AVAILABLE FOR OUTSIDE MODULES

var app = module.exports = express();
var port = 59787;

//ADDING BODY PARSER

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    { extended: true }
));

//SETTING UP MASSIVE INSTANCE WITH connectionString

var connectionString = "postgres://mesquita:fujitsu@localhost:5432/mesquita";
var massiveInstance = massive.connectSync({
    connectionString: connectionString
});

//SET db PROPERTY TO BE ABLE TO GET IT FROM OUTSIDE MODULES

app.set('db', massiveInstance);
var db = app.get('db');

//SERVE STATIC ASSETS

app.use(express.static(__dirname + '/dist'));

//REQUIRING CONTROLLERS

var dbController = require('./controllers/dbController.js');
var nodemailerController = require('./controllers/nodemailerController.js');

app.post('/api/contact', dbController.addContact, nodemailerController.sendContactEmail);

app.listen(port, function(req, res){
    console.log('Listening on: ', port);
})
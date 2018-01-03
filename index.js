//REQUIRING MODULES

var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');

var nodemailerController = require('./controllers/nodemailerController.js');

//INSTANCIATING EXPRESS, MAKING IT AVAILABLE FOR OUTSIDE MODULES

var app = (module.exports = express());
var port = 59787;

//ADDING BODY PARSER

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//SETTING UP MASSIVE INSTANCE WITH connectionString

var connectionString = 'postgres://mezka:fujitsu@localhost:5432/mezka';
var massiveInstance = massive.connectSync({
    connectionString: connectionString,
});

//SET db PROPERTY TO BE ABLE TO GET IT FROM OUTSIDE MODULES

app.set('db', massiveInstance);
var db = app.get('db');

var dbController = require('./controllers/dbController.js');
var initController = require('./controllers/initController.js');

//INITIALIZE DATABASE

initController.createTables();
initController.createUsers();

//SERVE STATIC ASSETS

app.use(express.static(__dirname + '/dist'));

app.post(
    '/api/contact',
    dbController.addContact,
    nodemailerController.sendContactEmail
);

app.listen(port, function(req, res) {
    console.log('Listening on: ', port);
});

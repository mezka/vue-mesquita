//REQUIRING MODULES

var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var session = require('express-session');
var flash = require('connect-flash');
var cors = require('cors');
var nunjucks = require('nunjucks');

var nodemailerController = require('./controllers/nodemailerController.js');
var authController = require('./controllers/authController.js');
var templateController = require('./controllers/templateController.js');
var keys = require('./keys.js');

//INSTANCIATING EXPRESS, MAKING IT AVAILABLE FOR OUTSIDE MODULES

var app = express();
var port = 8081;

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});



module.exports = {
    app: app,
    nunjucks: nunjucks,
};


//ADDING BODY PARSER

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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
initController.generateCsvFromOds.call(initController);
initController.createTables.call(initController);

//GET PRE CONFIGURED PASSPORT INSTANCE

var passport = require('./services/passport.js');

//CONFIGURE AND ADD SESSION, INITIALIZE PASSPORT AND ADD IT, INITIALIZE PASSPORT SESSION AND ADD IT

app.use(
    session({
        saveUninitialized: false,
        resave: false,
        secret: keys.sessionSecretKey,
    })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.post(
    '/api/login',
    passport.authenticate('local', {
        successRedirect: '/api/login/success',
        failureRedirect: '/api/login/failure',
        failureFlash: true,
    })
);

//SERVE STATIC ASSETS

app.use(express.static(__dirname + '/dist'));

app.get('/api/login/success', authController.sendAuthSuccesful);
app.get('/api/login/failure', authController.sendAuthFailed);
app.post('/api/logout', authController.authorize, authController.logout); //REQUIRES LOGIN

app.post(
    '/api/contact',
    dbController.addContact,
    nodemailerController.sendContactEmail
);


//ENDPOINTS

app.get(
    '/api/user',
    authController.authorize,
    dbController.getUserNameAndLastName
);

app.get('/api/products/:categoryId', dbController.getProductsByCategoryId);
app.get('/api/clients', dbController.getClientsAndClientContacts);
app.get('/api/categoriasfiscales', dbController.getCategoriasFiscales);
app.get('/api/formasdepago', dbController.getFormasDePago);
app.get('/api/presupuesto/get/:presupuestoid', dbController.getPresupuestoByIdParam);

app.post('/api/presupuesto/add', dbController.getUser, dbController.addPresupuesto, dbController.getPresupuestoById, templateController.generatePresupuesto);

app.post('/api/clients/add', dbController.addClientAndContactAndClientContact);
app.post('/api/clients/delete', dbController.deleteClient);
app.post('/api/contacts/add', dbController.addContactAndClientContact);
app.post('/api/contacts/delete', dbController.deleteContact);


app.listen(port, function (req, res) {
    console.log('Listening on: ', port);
});

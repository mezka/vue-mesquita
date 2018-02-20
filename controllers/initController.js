var index = require('../index.js');
var app = index.app;
var db = app.get('db');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var path = require('path');
var XLSX = require('xlsx');

var dest = '/../db/csv/';
var odsPath = 'schema.ods';

var initController = {
    createTables: function createTables() {
        db.createTables(function (error, result) {
            if (result) {
                console.log('Created tables ...');
            } else {
                console.log(error);
                return error;
            }
        });
    },

    createUsers: function createUsers() {
        var newUser = db.mesquita.users.insertSync({
            useremail: 'emiliano_mesquita@hotmail.com',
            userfirstname: 'Emiliano',
            userlastname: 'Mesquita',
            useraddress1: 'Av. Vergara 4775',
            useraddress2: 'Berazategui, Buenos Aires',
        });

        console.log('Created test user ...');

        bcrypt.genSaltSync(10);

        var newUserHash = bcrypt.hashSync('123456');

        db.mesquita.passwords.insertSync({
            userid: newUser.userid,
            passwordhash: newUserHash,
        });

        console.log('Created test user password ...');
    },

    createCategoriasFiscales: function createCategoriasFiscales() {
        var newCategoriaFiscal = db.mesquita.categoriasfiscales.insertSync({
            categoriafiscalname: 'RESPONSABLE INSCRIPTO',
            categoriafiscalimpuesto: 0.21,
        });

        console.log('Created test categoria fiscal ...');
    },

    createClients: function createClients() {
        var newClient = db.mesquita.clients.insertSync({
            clientname: 'GIDRAL COMUNICACIONES S.R.L',
            categoriafiscalid: 1,
            clientcuit: '30711195676',
            clientphone: '49617854',
            clientfiscaladdress: 'AV MITRE 33, AVELLANEDA, BUENOS AIRES',
            clientaddress: 'AV MITRE 33, AVELLANEDA, BUENOS AIRES',
        });

        var newContact = db.mesquita.contacts.insertSync({
            contactname: 'JUAN PEREZ',
            contactphone: '1540965874',
            contactemail: 'juanperez@gmail.com',
            contacttimetocontact: null,
            contacttext: null,
        });

        var newContact2 = db.mesquita.contacts.insertSync({
            contactname: 'JUAN RULFO',
            contactphone: '14556516',
            contactemail: 'juanrulfo@gmail.com',
            contacttimetocontact: null,
            contacttext: null,
        });

        var newClientContact = db.mesquita.clientcontacts.insert({
            clientid: newClient.clientid,
            contactid: newContact.contactid,
        });

        var newClientContact2 = db.mesquita.clientcontacts.insert({
            clientid: newClient.clientid,
            contactid: newContact2.contactid,
        });


        console.log('Created test client ...');
    },


    generateCsvFromOds: function generateCsvFromOds() {
        var workbook = XLSX.readFile(odsPath);

        for (var i = 1; i < workbook.SheetNames.length; i++) {
            console.log(
                'Generated ' +
                workbook.SheetNames[i] +
                '.csv from: ' +
                odsPath +
                '\n'
            );

            var currentFileName = path.normalize(
                __dirname + dest + workbook.SheetNames[i] + '.csv'
            );

            fs.writeFile(
                currentFileName,
                XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[i]])
            );
        }
    },

    importCsvFiles: function importCsvFiles() {
        return db.importCsvFiles(function (error, result) {
            if (result) {
                console.log('Imported CSV files into database ...\n');
                // process.exit(0);
            } else {
                console.log(
                    'Error importing CSV files into database: ',
                    error,
                    '\n'
                );
                // process.exit(0);
            }
        });
    },
};

module.exports = initController;

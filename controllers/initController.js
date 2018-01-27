var app = require('../index.js');
var db = app.get('db');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var path = require('path');
var XLSX = require('xlsx');

var dest = '/../db/csv/';
var odsPath = 'schema.ods';

var initController = {
    createTables: function createTables() {
        db.createTables(function(error, result) {
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
        return db.importCsvFiles(function(error, result) {
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

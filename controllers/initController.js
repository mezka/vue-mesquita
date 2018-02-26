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
    createTables() {
        db.createTables(function (error, result) {
            if (result) {
                console.log('Created tables ...');
                initController.importCsvFiles();
            } else {
                console.log(error);
                return error;
            }
        });
    },

    createTestUserPassword() {

        bcrypt.genSaltSync(10);

        var newUserHash = bcrypt.hashSync('123456');

        db.mesquita.passwords.insertSync({
            userid: 1,
            passwordhash: newUserHash,
        });

        console.log('Created test user password ...');
    },

    generateCsvFromOds() {
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

    importCsvFiles() {
        return db.importCsvFiles(function (error, result) {
            if (result) {
                console.log('Imported CSV files into database ...\n');
                initController.createTestUserPassword();
            } else {
                console.log(
                    'Error importing CSV files into database: ',
                    error,
                    '\n'
                );
            }
        });
    },
};

module.exports = initController;

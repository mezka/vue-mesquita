var app = require('../index.js');
var db = app.get('db');
var bcrypt = require('bcryptjs');

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
};

module.exports = initController;
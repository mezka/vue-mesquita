var index = require('../index.js');

var app = index.app;
var db = app.get('db');


var dbController = {
    addContact: function (req, res, next) {


        if (req.body.clientid) {
            db.addContactAndClientContact(
                [
                    req.body.clientid,
                    req.body.name,
                    req.body.email,
                    req.body.phone,
                    req.body.timetocontact,
                    req.body.text,
                ],
                function (error, result) {
                    if (error) {
                        console.log(error);
                        res.status(500).send(error);
                    } else {
                        req.result = result;
                        next();
                    }
                }
            );
        }

        db.contacts.insert(
            {
                contactname: req.body.name,
                contactphone: req.body.phone,
                contactemail: req.body.email,
                contacttimetocontact: req.body.timetocontact,
                contacttext: req.body.text,
            },
            function (error, result) {
                if (error) {
                    res.status(500).send(error);
                } else {
                    req.result = result;
                    next();
                }
            }
        );

    },
    getUserNameAndLastName: function (req, res, next) {
        db.mesquita.users.find(req.session.passport.user, function (
            error,
            result
        ) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(result);
            }
        });
    },

    getUser: function (req, res, next) {
        db.mesquita.users.find(req.session.passport.user, function (error, result) {
            if (error) {
                throw error
            } else {
                req.user = result;
                next();
            }
        });
    },

    getProductsByCategoryId: function (req, res) {
        db.getProductsByCategoryId([req.params.categoryId], function (
            error,
            result
        ) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(result);
            }
        });
    },
    getClientsAndClientContacts: function (req, res) {
        db.getClientsAndClientContacts([], function (error, result) {

            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(result);
            }
        });
    },

    addPresupuesto: function (req, res) {

        console.log(req.body);


        res.status(200).send('compiled');
    },

    addClientAndContactAndClientContact: function (req, res) {

        var clientObj = req.body;

        console.log(clientObj);

        db.addClientAndClientContact([clientObj.clientcontactname, clientObj.clientcontactemail, clientObj.clientcontactphone, clientObj.clientname, clientObj.clientaddress, clientObj.clientphone, clientObj.clientcuit, clientObj.clientcategoriafiscalid, clientObj.clientfiscaladdress], function (error, result) {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                res.status(200).send(result);
            }
        });
    },

    deleteClient: function (req, res) {

        console.log(req.body);

        db.deleteClient([req.body.clientid], function (error, result) {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                res.status(200).send(result);
            }
        });
    },

    deleteContact: function (req, res) {
        db.deleteContact([req.body.contactid], function (error, result) {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                res.status(200).send(result);
            }
        });
    },

    getCategoriasFiscales: function (req, res) {
        db.getCategoriasFiscales(function (error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(result);
            }
        });
    }
};

module.exports = dbController;

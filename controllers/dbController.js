var app = require('../index.js');
var db = app.get('db');

var dbController = {
    addContact: function (req, res, next){
        db.contacts.insert({
            contactname: req.body.name,
            contactphone: req.body.phone,
            contactemail: req.body.email,
            contacttimetocontact: req.body.timetocontact,
            contacttext: req.body.text,
        }, function (error, result){
            if(error){
                res.status(500).send(error);
            } else {
                req.result = result;
                next();
            }
        });
    },
};


module.exports = dbController;


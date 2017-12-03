var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mailgunPassword = require('./keys.js');

var app = module.exports = express();

var port = 59787;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    { extended: true }
));

app.use(express.static(__dirname + '/dist'));

app.post('/api/contact', function (req, res) {


    var transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: 587,
        auth: {
            user: 'postmaster@sandboxf2530c8c879d4cd2b703815ca697b446.mailgun.org',
            pass: mailgunPassword
        }
    });

    var mailText = 'Nombre completo: ' + req.body.name + '\nTelefono: ' + req.body.phone + '\nE-mail: ' + req.body.email + '\nHorario para contactarlo: ' + req.body.timetocontact + '\nComentarios: ' + req.body.text;
    
    var mailOptions = {
        from: 'mesquita.emiliano@gmail.com',
        to: 'psychatog36@gmail.com',
        subject: 'Contacto desde www.mesquita.com.ar',
        text: mailText,
    };





    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
    });
});

app.listen(port, function(req, res){
    console.log('Listening on: ', port);
})
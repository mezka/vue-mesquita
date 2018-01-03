var keys = require('../keys.js');

var nodemailer = require('nodemailer');

var nodemailerController = {
    sendContactEmail: function(req, res) {
        var transporter = nodemailer.createTransport({
            host: 'smtp.mailgun.org',
            port: 587,
            auth: {
                user:
                    'postmaster@sandboxf2530c8c879d4cd2b703815ca697b446.mailgun.org',
                pass: keys.mailgunPassword,
            },
        });

        var mailText =
            'Nombre completo: ' +
            req.body.name +
            '\nTelefono: ' +
            req.body.phone +
            '\nE-mail: ' +
            req.body.email +
            '\nHorario para contactarlo: ' +
            req.body.timetocontact +
            '\nComentarios: ' +
            req.body.text;

        var mailOptions = {
            from: 'mesquita.emiliano@gmail.com',
            to: 'psychatog36@gmail.com',
            subject: 'Contacto desde www.mesquita.com.ar',
            text: mailText,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.json({ yo: 'error' });
            } else {
                console.log('Message sent: ' + info.response);
                res.json({ yo: info.response });
            }
        });
    },
};

module.exports = nodemailerController;

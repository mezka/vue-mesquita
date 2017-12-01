var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = module.exports = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    { extended: true }
));

var port = 59787;

app.post('/api/contact', function (req, res) {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass  // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
            to: 'emiliano_mesquita@hotmail.com, psychatog36@gmail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: req.body.text, // plain text body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });

    console.log(req.body.text);

    res.status(200).json(req.body);
});


app.listen(port, function() {
    console.log('Listening on port: ', port, '\n');
});







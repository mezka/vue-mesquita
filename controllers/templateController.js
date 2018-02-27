var index = require('../index.js');
var nunjucks = index.nunjucks;
var presupuestadorService = require('../services/presupuestadorService.js');
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');


var templateController = {
    generatePresupuesto: function generatePresupuesto(req, res) {

        res.render('template.html', req.result.presupuesto,

            function cb(error, result) {

                if (error) {
                    console.log(error);
                }

                wkhtmltopdf(result, { pageSize: 'A4' })
                    .pipe(fs.createWriteStream('out.pdf'));


                res.status(200).send(result);
            });
    }
}

module.exports = templateController;

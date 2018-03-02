var index = require('../index.js');
var nunjucks = index.nunjucks;
var presupuestadorService = require('../services/presupuestadorService.js');
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');


var templateController = {
    generatePresupuesto(req, res) {

        res.render('template.html', req.result.presupuesto, (error, result) => {

            if (error) {
                console.log(error);
            }

            fs.writeFile("templateOut.html", result, (err) => {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });

            wkhtmltopdf(result, { pageSize: 'A4' })
                .pipe(fs.createWriteStream('out.pdf'));


            res.status(200).send(result);
        });
    }
}

module.exports = templateController;

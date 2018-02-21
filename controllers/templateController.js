var index = require('../index.js');
var nunjucks = index.nunjucks;
var presupuestadorService = require('../services/presupuestadorService.js');
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');


var templateController = {
    generatePresupuesto: function generatePresupuesto(req, res) {

        let date = new Date();
        let dateString = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

        let formattedCart = presupuestadorService.formatCart(req.body.cart);

        let client = {
            name: req.body.client.clientname,
            accnumber: req.body.client.clientid,
            categoriafiscal: 'Responsable Inscripto',
            cuit: req.body.client.clientcuit
        };

        let presupuesto = {
            presupuestoid: '001',
            presupuestoseller: req.user.userfirstname + ' ' + req.user.userlastname,
            presupuestopaymethod: 'Efectivo',
            presupuestooc: '001',
            presupuestosubtotal: presupuestadorService.calculatePresupuestoPrice(formattedCart, 1),
            presupuestodiscount: '0',
            presupuestoimpuesto: '21%',
            presupuestoimpuestoprice: presupuestadorService.calculatePresupuestoPrice(formattedCart, 0.21),
            presupuestototal: presupuestadorService.calculatePresupuestoPrice(formattedCart, 1.21),
            presupuestostringtotal: presupuestadorService.numeroALetras(presupuestadorService.calculatePresupuestoPrice(formattedCart, 1.21), {
                plural: 'PESOS',
                singular: 'PESO',
                centPlural: 'CENTAVOS',
                centSingular: 'CENTAVO'
            }),
        };

        res.render('template.html', {
            products: formattedCart,
            client: client,
            date: dateString,
            presupuesto: presupuesto,
        }, function cb(error, result) {

            wkhtmltopdf(result, { pageSize: 'A4' }).pipe(fs.createWriteStream('out.pdf'));

            res.status(200).send(result);
        });
    }
}

module.exports = templateController;

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
            categoriafiscal: req.body.client.categoriafiscalname,
            cuit: req.body.client.clientcuit
        };

        let presupuesto = {
            presupuestoid: '001',
            presupuestoseller: req.user.userfirstname + ' ' + req.user.userlastname,
            presupuestopaymethod: 'Efectivo',
            presupuestooc: '001',
            presupuestosubtotal: presupuestadorService.calculatePresupuestoPrice(formattedCart, 1),
            presupuestodiscount: presupuestadorService.calculateTotalDiscount(formattedCart),
            presupuestoimpuesto: (req.body.client.categoriafiscalimpuesto * 100).toFixed(2) + '%',
            presupuestoimpuestoprice: presupuestadorService.calculatePresupuestoPrice(formattedCart, req.body.client.categoriafiscalimpuesto),
            presupuestototal: presupuestadorService.calculatePresupuestoPrice(formattedCart, 1 + req.body.client.categoriafiscalimpuesto),
            presupuestostringtotal: presupuestadorService.numeroALetras(presupuestadorService.calculatePresupuestoPrice(formattedCart, 1 + req.body.client.categoriafiscalimpuesto), {
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

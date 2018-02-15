var index = require('../index.js');
var nunjucks = index.nunjucks;
var presupuestadorService = require('../services/presupuestadorService.js');
var fs = require('fs');


var templateController = {
    generatePresupuesto: function generatePresupuesto(req, res) {

        let date = new Date();
        let dateString = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

        let formattedCart = presupuestadorService.formatCart(req.body);

        console.log(formattedCart);

        let client = {
            name: 'Gidral',
            accnumber: 0,
            categoriafiscal: 'Responsable Inscripto',
            cuit: '30709875821'
        };

        let presupuesto = {
            presupuestoid: '001',
            presupuestoseller: 'Emilano',
            presupuestopaymethod: 'Efectivo',
            presupuestooc: '001',
            presupuestosubtotal: presupuestadorService.calculatePresupuestoPrice(formattedCart, 1),
            presupuestodiscount: '0',
            presupuestoimpuesto: '21%',
            presupuestoimpuestoprice: presupuestadorService.calculatePresupuestoPrice(formattedCart, 0.21),
            presupuestototal: presupuestadorService.calculatePresupuestoPrice(formattedCart, 1.21),
        };




        console.log(req.body);

        res.render('template.html', {
            products: formattedCart,
            client: client,
            date: dateString,
            presupuesto: presupuesto,
        }, function cb(error, result) {
            fs.writeFile('./out.html', result, { flag: 'w' }, function (err, data) {
                if (err) throw err;

                console.log('done');
            });
        });

    }
}

module.exports = templateController;

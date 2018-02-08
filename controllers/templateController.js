var index = require('../index.js');
var nunjucks = index.nunjucks;


var templateController = {
    generatePresupuesto: function generatePresupuesto(req, res) {
        console.log(req.body);
        res.render('template.html', { products: req.body });
    }
}

module.exports = templateController;
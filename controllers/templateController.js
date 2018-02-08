var index = require('../index.js');
var nunjucks = index.nunjucks;


var templateController = {
    generatePresupuesto: function generatePresupuesto(req, res) {
        res.render('index.html', { username: 'mezka' });
    }
}

module.exports = templateController;
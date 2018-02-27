var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');

wkhtmltopdf('<h1>caca</h1>', { pageSize: 'A4', headerHtml: 'templates/header.html', footerHtml: 'templates/footer.html' })
    .pipe(fs.createWriteStream('out.pdf'));


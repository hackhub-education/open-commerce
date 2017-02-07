var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');

mongoose.connect('mongodb://yan:hong@ds127938.mlab.com:27938/open-commerce'); // connect to our database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', require('./app/controllers'));

var port = process.env.PORT || 8080;

app.listen(port);
console.log('Magic happens on port ' + port);
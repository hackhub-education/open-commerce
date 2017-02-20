var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose   = require('mongoose'),
    config = require('./config'),
    cors = require('cors');

var port = process.env.PORT || 8080;
mongoose.connect(config.database); // connect to our database

app.set('superSecret', config.secret);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/api', require('./app/controllers'));

app.listen(port);
console.log('Magic happens on port ' + port);
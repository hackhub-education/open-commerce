var express = require('express'),
    router = express.Router();

router.use(require('./products'));
router.use(require('./orders'));

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

module.exports = router
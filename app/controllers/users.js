var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken');

router.post('/signup', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (user) {
            res.json({success: false, message: 'Username has been taken.'});
        } else {

            var newUser = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password),
                admin: false
            });

            newUser.save(function (err) {
                if (err) throw err;

                console.log('New user created.');
                res.json({success: true});
            });

        }
    });
});

router.post('/login', function(req, res) {

    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (bcrypt.compareSync(req.body.password, user.password)) {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, req.app.get('superSecret'), {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });

            } else {

                res.json({ success: false, message: 'Authentication failed. Wrong password.' });

            }

        }

    });
});

router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

router.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

module.exports = router
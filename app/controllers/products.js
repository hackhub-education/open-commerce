var express = require('express')
    , router = express.Router()
    , Product     = require('../models/product');

router.route('/products')

    .post(function(req, res) {

        var product = new Product();
        product.name = req.body.name;

        product.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Product created!' });
        });

    })

    .get(function(req, res) {
        Product.find(function(err, products) {
            if (err)
                res.send(err);

            res.json(products);
        });
    });


router.route('/products/:product_id')

    .get(function(req, res) {
        Product.findById(req.params.product_id, function(err, product) {

            if (err)
                res.send(err);
            res.json(product);

        });

    })

    .put(function(req, res) {

        Product.findById(req.params.product_id, function(err, product) {

            if (err)
                res.send(err);

            product.name = req.body.name;

            product.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Product updated!' });
            });

        });
    })

    .delete(function(req, res) {
        Product.remove({
            _id: req.params.product_id
        }, function(err, product) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router
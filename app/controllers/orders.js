var express = require('express'),
    router = express.Router(),
    User  = require('../models/user'),
    Product  = require('../models/product'),
    Order = require('../models/order');


router.route('/orders')

    .post(function(req, res) {

        var order = new Order();

        order.user = req.user._id;

        var productList = req.body.products;

        for (var index = 0; index < productList.length; index++) {
            var productId = productList[index];

            order.products.push(productId);

            order.save(function(err, doc) {
                if (err)
                    res.send(err);
                console.log('Saved!');
                console.log(doc);
            });
            Product.findById(productId, function(err, product) {
                if (err)
                    return res.send(err);

                if (product.stock > 0) {
                    product.stock --;

                    product.save(function(err) {
                        if (err)
                            res.send(err);
                        console.log('Checkout Stock on Product ' + product.name)
                    });


                } else {
                    for (var i = index; i >= 0; i--) {
                        Product.findById(productList[index]._id, function(err, product) {
                            product.stock ++;
                            product.save(function(err) {
                                if (err)
                                    res.send(err);
                                console.log('Restock Stock on Product ' + product.name)
                            });
                        });
                    }

                    return res.json({ message: product.name + ' is out of stock!' });
                }
            })


        }

        res.json({ message: 'Order created!' });


    })

    .get(function(req, res) {
        Order.find(function(err, orders) {
            if (err)
                res.send(err);

            res.json(orders);
        });
    });


router.route('/orders/:order_id')

    .get(function(req, res) {
        Order.findById(req.params.order_id, function(err, order) {

            if (err)
                res.send(err);
            res.json(order);

        });

    })

    .put(function(req, res) {

        Order.findById(req.params.order_id, function(err, order) {

            // update order and restock / stock product

            if (err)
                res.send(err);

            order.products = req.body.products;

            order.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Order updated!' });
            });

        });
    })

    .delete(function(req, res) {
        Order.remove({
            _id: req.params.order_id
        }, function(err, order) {

            // update order and restock

            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router;
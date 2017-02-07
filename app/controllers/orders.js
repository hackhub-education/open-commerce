var express = require('express'),
    router = express.Router(),
    User     = require('../models/user'),
    Product     = require('../models/product'),
    Order = require('../models/order');


router.route('/orders')

    .post(function(req, res) {

        var order = new Order();

        order.user = req.user._id;

        var productList = req.body.products;

        productList.forEach(function(product_id) {
            Product.findById(product_id, function(err, product) {
                if (err)
                    return res.send(err);

                if (product.stock > 0) {
                    order.products.push(product._id);
                    // product.stock--;
                    // product.save(function(err) {
                    //     if (err)
                    //         res.send(err);
                    //     console.log('Product Updated!')
                    // });
                } else {
                    return res.json({ message: product.name + ' is out of stock!' });
                }
            })
        });

        productList.forEach(function(product_id) {
            Product.findById(product_id, function(err, product) {
                if (err)
                    return res.send(err);
                product.stock--;
                product.save(function(err) {
                    if (err)
                        return res.send(err);
                    console.log('Product Updated!');
                });
            })
        });

        order.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Order created!' });
        });

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

            if (err)
                res.send(err);

            order.name = req.body.name;

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
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router
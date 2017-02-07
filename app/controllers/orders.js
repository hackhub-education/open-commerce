var express = require('express')
    , router = express.Router()
    ,Product     = require('../models/product')
    , Order     = require('../models/order');


router.route('/orders')

    .post(function(req, res) {

        var order = new Order();
        order.products = req.body.products;

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
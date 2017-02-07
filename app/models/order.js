var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({
    products:[
        // {product: Schema.Types.ObjectId, ref: 'Product'}
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);

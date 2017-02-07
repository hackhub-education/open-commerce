var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema   = new Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    stock: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);


var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({
    user: String,
    products:[String]

}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);

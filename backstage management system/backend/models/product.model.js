const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var schema = new mongoose.Schema({ 
    name: String,
    title:String,
    cateId: mongoose.Schema.ObjectId,
    price:Number,
    address:String,
    brief: String,
    author: String,
    source: String,
    url:String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    desc: String,
});
schema.plugin(mongoosePaginate);
module.exports =  mongoose.model('Product',  schema, 'product');
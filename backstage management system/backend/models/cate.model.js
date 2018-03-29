const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-materialized');
var schema = new mongoose.Schema({ 
    type: Number,
    text: String,
    cateId:mongoose.Schema.ObjectId,
    userId:mongoose.Schema.ObjectId

});
schema.plugin(mongoosePaginate);
module.exports =  mongoose.model('Cate',  schema, 'cate');
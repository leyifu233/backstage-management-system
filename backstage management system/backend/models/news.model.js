const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var schema = new mongoose.Schema({ 
    title: String,
    brief: String,
    author: String,
    source: String,
    date: { type: Date, default: Date.now },
    desc: String,
    interest: [],
    cateId:mongoose.Schema.ObjectId,
    userId:mongoose.Schema.ObjectId
});
schema.plugin(mongoosePaginate);
module.exports =  mongoose.model('News',  schema, 'news');
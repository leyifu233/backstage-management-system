const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({ 
    name: String,
    password: String,
    mail: String,
    city: String,
    data: { Type: Date},
    gender: String,
    interest: [],
    desc: String
 });

 schema.plugin(mongoosePaginate);
 module.exports = mongoose.model('User',  schema,  'user');
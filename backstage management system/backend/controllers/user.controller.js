const mongoose = require('mongoose');
const User = require('../models/user.model');

exports.get = function(req,res,next){
    const id = req.params.id;
    User.findById(id,function(err,data){
        res.json(data);
    })
}

exports.create = function(req,res,next){
    const user = new User(req.body);
    user.save()
    .then(data=>{
         res.json(data);
    })
}

exports.update = function(req,res,next){
    const id = req.params.id;
    const user = new User(req.body);

    User.findByIdAndUpdate(id, {$set: req.body}, {new: false})
    .then(data=>{
        res.json(data);
    })
}

exports.remove = function(req,res,next){
    const id = req.params.id;
    User.findByIdAndRemove(id,function(err,data){
        res.json({'message':'数据已删除'})
    })
}

exports.removes = function(req,res,next){
    var ids = req.body.ids;
    ids = ids.split(',');
   
    if(ids.length>0){
        User.remove( {_id: {$in: ids}})
        .then(data=>{
            res.json({'message':'多条数据已删除'});
        })   
    }else{
        res.status(404).send({'message':'404'});
    }
}

exports.list = function(req,res,next){
    var page = (req.body.page) ? req.body.page : 1;
    var rows = (req.body.rows) ? req.body.rows : 5;

    var queryCondition = {};

    if(req.body.name && req.body.name.trim().length>0){
        name = req.body.name;
        queryCondition = {
            "name": new RegExp(name,'i')
        }
    }
    User.paginate(queryCondition,{page: +page, limit: +rows},function(err, result){
        // res.json(result);
        result.rows =result.docs;
        delete result.docs;
        res.json(result);
    })
}
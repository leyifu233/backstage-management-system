/*
逻辑控制,增、删、改、查
*/
const mongoose = require('mongoose');
const Cate = require('../models/cate.model');




/* 增 */
exports.create = function(req,res,next){
    const cate = new Cate(req.body); 
    cate.save()
    .then(data=>{
        res.json(data);
    })
}

/* 修 */
// 参数：设参 传参 接参
exports.update = function(req,res,next){

    const id = req.params.id;
    const cate = new Cate(req.body);

    Cate.findByIdAndUpdate(id, { $set: req.body }, {new: false})
    .then(data=>{
        res.json(data); 
    })

}

function reverseTree(data,pid){
    var result=[],
    temp;

    var data =JSON.parse(JSON.stringify(data));
    for(var i in data){
        if(data[i].parentId ===pid){
            result.push(data[i]);
            temp =reverseTree(data,data[i]._id);
            if(temp.length>0){
                data[i].children =temp;
            }
        }
    }
    return result;
}

exports.list=function(req,res,next){
    var type=req.params.type||1  //1：商品 2：新闻
 
    Cate.find({type:type},function(err,data){
        var rpTree=reverseTree(data,null);
        res.json(rpTree);
    })
}


//删除
exports.remove = function(req,res,next){
    const id = req.params.id;
    Cate.findByIdAndRemove(id,function(err,data){
        res.json({'message':'数据已删除'})
    })    
}
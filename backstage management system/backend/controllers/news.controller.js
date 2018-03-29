/*
逻辑控制,增、删、改、查
*/
const mongoose = require('mongoose');
const News = require('../models/news.model');


exports.get =function(req,res,next){
    const id =req.params.id;
    News.findById(id,function(err,data){
        res.json(data);
    })
}



/* 增 */
exports.create = function(req,res,next){
    const news = new News(req.body); 
    news.save()
    .then(data=>{
        res.json(data);
    })
}

/* 修 */
// 参数：设参 传参 接参
exports.update = function(req,res,next){
   
    const id = req.params.id;
    const news = new News(req.body);

    News.findByIdAndUpdate(id, { $set: req.body }, {new: false})
    .then(data=>{
        res.json(data); 
    })

}

/* 删 */
exports.remove = function(req,res,next){
    const id = req.params.id;
    News.findByIdAndRemove(id,function(err,data){
        res.json({'message':'数据已删除'})
    })    
}

/* 删多个 */

exports.removes = function(req,res,next){
    var ids = req.body.ids;
    ids=ids.split(',');
    if(ids.length>0){
        News.remove( { _id: {$in: ids }})
        .then(data=>{
            res.json({'message':'多条数据已删除'});
        })
    }else{
        res.status(404).send({'message':'404'});
    }
}


/* 查 */
exports.list = function(req,res,next){
    var page = (req.body.page) ? req.body.page : 1;
    var rows = (req.body.rows) ? req.body.rows : 5;

    var queryCondition = {};

    if(req.body.title && req.body.title.trim().length>0){
        title = req.body.title;
        queryCondition = {
            "title": new RegExp(title,'i')
        }
    }
    //分类
    if(req.body.cateId && req.body.cateId.trim().length>0){
        cateId = req.body.cateId;
        queryCondition = Object.assign(queryCondition,{
            cateId : cateId
        })
    }

    News.paginate(queryCondition,{page: +page, limit: +rows},function(err, result){


            result.rows = result.docs;
            delete result.docs;
            res.json(result)

    })
   
}
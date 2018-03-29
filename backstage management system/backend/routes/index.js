var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res, next) {
    mongoose.connect('mongodb://localhost/test');
    console.log(req.query.name)
    const Cat = mongoose.model('Cat', { name: String });

    const kitty = new Cat({ name: req.query.name });
    kitty.save().then((data) =>{
      res.json(data);
    });

});

router.post('/', function(req, res, next) {
  mongoose.connect('mongodb://localhost/test');
  const Cat = mongoose.model('Cat', { name: String,sex:Number });
  
      const kitty = new Cat(req.body);
    
      kitty.save().then((data) =>{
        res.json(data);
      });

});

module.exports = router;

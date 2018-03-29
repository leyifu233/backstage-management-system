var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/comment.controller');

router.get('/data/:id',dataCtrl.get);
router.post('/data',dataCtrl.create);
router.put('/data/:id',dataCtrl.update);
router.delete('/data/:id',dataCtrl.remove);
router.post('/data/removes',dataCtrl.removes);
router.post('/list',dataCtrl.list);

module.exports = router;

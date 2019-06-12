var express=require('express');
var router=express.Router();
var db=require('../models/restaurant');

router.post('/restaurant/findById',db.findById);
router.post('/restaurant/findByName',db.findByName);

router.get('/',(request,response)=>{
    response.json({info: 'Node.js, Express, and Postgres API'})
})

module.exports=router;
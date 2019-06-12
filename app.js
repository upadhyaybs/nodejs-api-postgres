const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const pino =require('pino');
const expressPino=require('express-pino-logger');
const routes=require('./api/routes/index');

const logger=pino({level:process.env.LOG_LEVEL|| 'info'});
const expressLogger=expressPino({logger});

const port=process.env.port || 3000;
var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',routes);

//catch 404 and forward to error handler
app.use(function (req,res,next){
    var err=new Error('Not Found');
    err.status=404;
    next(err);
});

//error handlers
if (app.get('env')=='development'){
    app.use(function(err,request,respone,next){
        res.status(err.code||500)
        .json({
            status:'error',
            message : err
        });
    });
}

//Production error handler
//No stacktrace
app.use(function(err,request,respone,next){
    res.status(err.code||500)
    .json({
        status:'error',
        message : err.message
    });
});

app.listen(port,() => { 
    console.log('nodejs-rest-api-demo server started on : '+port);
})
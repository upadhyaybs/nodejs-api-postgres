const Pool =require('pg').Pool;
const pool =new Pool ( {
    user:'fgmhzqwunnvfsn',
    host:'ec2-23-21-186-85.compute-1.amazonaws.com',
    database:'d7p2h6hcoas3f9',
    password:'f74312741de03769dc4709a42da561c3afa27ff20b29f8eded1740799d06428a',
    port :5432,
    ssl:true
    
})

function findById(request,response){
    const {id}=request.body;

    pool.query('SELECT * FROM RESTAURANT WHERE id=$1',[id],(error,results)=>{
        if(error){
            console.log(error.stack);
            throw error;
        }
    response.status(200)
    .json({status:'success',
            data:results.rows,
            message: 'Retrieved restaurant for id '+[id]
        });

    })
}

function findByName(request,response){
    const {name}=request.body;
    pool.query('SELECT * FROM RESTAURANT WHERE name=$1',[name],(error,results)=> {
        if(error){
            console.log(error.stack);
            throw error;
        }

        if (results.rows)
        response.status(200)
        .json({status:'success',
            data:results.rows,
            message:"Restrieved restaurant for name "+ [name]
    });
    })
}

module.exports ={
    findById:findById,
    findByName:findByName
};
const Pool =require('pg').Pool;
const dotenv = require('dotenv');


dotenv.config();

const pool =new Pool ( {
    //user:'fgmhzqwunnvfsn',
    //host:'ec2-23-21-186-85.compute-1.amazonaws.com',
    //database:'d7p2h6hcoas3f9',
    //password:'f74312741de03769dc4709a42da561c3afa27ff20b29f8eded1740799d06428a',
    //port :5432,
    connectionString:process.env.HEROKU_POSTGRESQL_ORANGE_URL,
    ssl:true
    
});


pool.on('connect', () => {
    console.log('connected to the db');
});

function findById(request,response){
    const {id}=request.body;
    const queryText='SELECT * FROM RESTAURANT WHERE id=$1';

    pool.query(queryText,[id],(error,results)=>{
        if(error){
            console.log(error.stack);
            throw error;
        }
    
    if (!results.rows[0]){
        response.status(404)
        .json({status:'not found',
                data:results.rows,
                message: 'Restaurant not found for id '+[id]
            });
        return;
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
    const queryText='SELECT * FROM RESTAURANT WHERE name=$1';
    pool.query(queryText,[name],(error,results)=> {
        if(error){
            console.log(error.stack);
            throw error;
        }

        if (!results.rows[0]){
            response.status(404)
            .json({status:'not found',
                    data:results.rows,
                    message: 'Restaurant not found for name '+[name]
                });
            return;
        }

       
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
const app =require("./app");
const dotenv=require("dotenv");
const connectDatabase=require("./config/databse");

// handling uncaught Exception

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shuting down the server due to handling uncaught Exception`);
    process.exit(1);

    
})

//config

dotenv.config({path:"backend/config/config.env"});

// connectioon databse

connectDatabase();



const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is Working on http://localhost:${process.env.PORT}`);
});
//console.log(youtube);

// unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shuting down the server due to unhandled promise Rejection`);
    server.close(()=>{
    process.exit(1);
});
});

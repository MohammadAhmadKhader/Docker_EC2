import express from "express"
import mongoose from "mongoose";
import redis from "redis";
//import Client from "./pg.cjs"

const app = express();

// const pgHost = "postgres"
// const pgPort = 5432;
// const pgUser = "root";
// const pgPassword = "example";
// const pgLink = `postgresql://${pgUser}:${pgPassword}@${pgHost}:${pgPort}`;

// const pgClient = new Client({
//     connectionString:pgLink,
// })

// pgClient.connect().then(()=>{
//     console.log("Connected to postgres Successfully!")
// }).catch((error)=>{
//     console.error(`Error has occured during establishing connection with postgres, Error : ${error}`)
// })

const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const redisClient = redis.createClient({
    url:`redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on("error",(error)=>{
    console.error(`Redis Client Error : ${error}`)
})
redisClient.on("connect",()=>{
    console.error(`Connected to Redis successfully!`)
})
redisClient.connect();

const MONGO_USERNAME = "root";
const MONGO_PASS = "example";
const DB_PORT = 27017;
const host = "mongo"

const URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASS}@${host}:${DB_PORT}`;

mongoose.connect(URL).then(()=> {
    console.log("Connected to mongoDB successfully!")
}).catch((error)=>{
    console.error('Failed to connect to database, error : ')
    console.error(error);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}`);
});

app.get("/",async(req,res)=>{
    redisClient.set('products',"products....");

    res.status(200).json({message:"products set successfully",usingDockerHubImage:true,test:1})
})

app.get("/data",async(req,res)=>{
    const products = await redisClient.get('products');

    res.status(200).json({message:"success",products})
})


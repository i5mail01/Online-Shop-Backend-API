const express = require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
require('dotenv/config');
const authJwt=require('./helpers/jwt');
const errorHandler=require('./helpers/error-handler');

app.use(cors());
app.options('*',cors());

//Middleware for the backend to accept JSON data
//Earlier used body parser now depreciated and we can use express.json()
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);


const PORT=process.env.PORT || 3000;
const api=process.env.API_URL;


const prodroute=require('./routes/products');
const cateroute=require('./routes/categories');
const userroute=require('./routes/users');
const orderroute=require('./routes/orders');


//All routes
app.use(`${api}/products`,prodroute);
app.use(`${api}/categories`,cateroute);
app.use(`${api}/users`,userroute);
app.use(`${api}/orders`,orderroute);



//Mongodb connection
mongoose.connect(process.env.CONNECTION_STRING,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    dbName:'eshop'
}).then(()=>{
    console.log("Sucessful connection to DB");
}).catch((err)=>{
    console.log(err);
})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})

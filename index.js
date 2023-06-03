// Require Packages;
const express = require('express');
const connectDB = require('./db/db');
const userRouter = require("./route/userRoute");
const app = express();
require('dotenv').config({ path:'./config.env' });

// Connection to Database;
connectDB();

// Middlewares (Checking, Verifying, Processing);
app.use(express.json());

// All Routes
app.use('/api', userRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is Running at Port ${PORT}`);
});
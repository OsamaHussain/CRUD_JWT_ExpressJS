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
app.use('/', (req, res)=>{
    return res.status(200).json({
        "Path": {
            "Main": "https://crudjwtexpressjs-production.up.railway.app/",
            "Signup":"https://crudjwtexpressjs-production.up.railway.app/api/signup/",
            "Login": "https://crudjwtexpressjs-production.up.railway.app/api/login/",
            "Fetch All Users": "https://crudjwtexpressjs-production.up.railway.app/api/",
            "Fetch Specific User By Email": "https://crudjwtexpressjs-production.up.railway.app/api/find/",
            "Fetch Specific User By ID": "https://crudjwtexpressjs-production.up.railway.app/api/find/:ID",
            "Update Specific User By Email": "https://crudjwtexpressjs-production.up.railway.app/api/update/",
            "Update Specific User By ID": "https://crudjwtexpressjs-production.up.railway.app/api/update/:ID",
            "Delete Specific User By Email": "https://crudjwtexpressjs-production.up.railway.app/api/delete/",
            "Delete Specific User By ID": "https://crudjwtexpressjs-production.up.railway.app/api/delete/:ID"
        },
        "Demo Data To Check Everything": {
            "_id": "647b80c5260c0589d2ba2ca5",
            "name": "admin",
            "email": "admin",
            "password": "Developer_admin!@#",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluIiwicGFzc3dvcmQiOiJEZXZlbG9wZXJfYWRtaW4hQCMiLCJpYXQiOjE2ODU4MTU0OTN9.JAPiCc1y7Bd3nsFNWbXe-IwHOTOuA0ejKQUTQQKvBiQ"
        },
        "How to Use": {
            "Signup": "To Create new User go to signup url, and pass json parameter of name, email, and password",
            "Login": "To Login User go to login url, and pass json parameter of email, and password",
            "Fetch All Users": "Go to /api url and You need to provide authorization token in header which you will receive at the time of signup to fetch all users.",
            "Fetch User by Email": "Go to /api/find/ url and You need to provide authorization token in header which you will receive at the time of signup and you also need to pass email in json format in body to fetch user by email",
            "Fetch User by ID": "Go to /api/find/:ID url and You need to provide authorization token in header which you will receive at the time of signup and you also need to pass ID in URL parameter in :ID to fetch user by id",
            "Update User by Email": "Go to /api/update/ url and You need to provide authorization token in header which you will receive at the time of signup and you also need to pass email in json format in body to update user by email",
            "Update User by ID": "Go to /api/update/:ID url and You need to provide authorization token in header which you will receive at the time of signup and you also need to pass ID in URL parameter in :ID to update user by id",
            "Delete User by Email": "Go to /api/delete/ url and You need to provide authorization token in header which you will receive at the time of signup and you also need to pass email in json format in body to delete user by email",
            "Delete User by ID": "Go to /api/delete/:ID url and You need to provide authorization token in header which you will receive at the time of signup and you also need to pass ID in URL parameter in :ID to delete user by id",
        }
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is Running at Port ${PORT}`);
});
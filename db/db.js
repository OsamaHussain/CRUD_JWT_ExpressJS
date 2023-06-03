const mongoose = require('mongoose');
async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true
        })
        console.log("Database Successfully Connected...");
    }
    catch(error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB;
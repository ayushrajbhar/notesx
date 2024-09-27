const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/React-notepad"

const connectToMongo = async ()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDb successfully")
    } catch (error) {
        console.log("Failure in connecting to MongoDb")
    }
}

module.exports = connectToMongo;
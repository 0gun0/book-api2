import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
const app = express();

dotenv.config();

//mongoDB 설정
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB")
}   catch(err){
    throw error;
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
});

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected!")
});



app.listen(8000, () =>{
    console.log("Book-API Connected!")
})
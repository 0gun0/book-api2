import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/Users.js";
import roomsRoute from "./routes/Rooms.js";
import booksRoute from "./routes/Books.js";

import bodyParser from 'body-parser';

const app = express();

dotenv.config();

//mongoDB 설정
try {
    await mongoose.connect(process.env.MONGO,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      }); //추가
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

//middlewares

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);
app.use("/api/rooms", roomsRoute);

app.use(bodyParser.json()); //parser

app.listen(8000, () =>{
    console.log("Book-API Connected!")
})
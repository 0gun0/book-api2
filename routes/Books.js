import express, { application } from "express";
import Book from "../models/Book.js";
import bodyParser from 'body-parser';

const router = express.Router();

app.use(bodyParser.json());
// 예약 생성 API

router.post('/book',(req,res)=>{
    const {roomId, userId, bookDateTime, durationHours} = req.body

    //요청된 시간을 Date 객체로 파싱

})







export default router;




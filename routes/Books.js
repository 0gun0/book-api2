import express, { application } from "express";
import Book from "../models/Book.js";


const router = express.Router();



// 예약 생성 API

router.post('/',(req,res)=>{
    const {roomId, userId, bookDateTime, durationHours} = req.body

    //요청된 시간을 Date 객체로 파싱
    const requestedTime = new Date(bookDateTime);
    const requestedHour = requestedTime.getHours(); //utc시간으로 할때임.

    // requestedTime.setHours(requestedTime.getHours() + 9); //UTC 시간을 한국시간으로 변환
    
    // const requestedHour = requestedTime.getHours(); //시간 추출 1시간 or 2시간

    //9시부터 18시 사이에 1,2시간 단위로 예약
    if (requestedHour >= 9 && requestedHour <= 18 && (requestedHour - 9) % durationHours === 0) {
        // 중복 예약 확인 (이미 해당 시간대에 예약이 있는지 확인)
        Book.find(
          {
            roomId: roomId,
            bookDateTime: requestedTime
          },
          (err, existingBookings) => {
            if (err) {
              res.status(500).json({ error: '예약 확인 중 오류가 발생했습니다.' });
            } else if (existingBookings.length > 0) {
              res.status(400).json({ error: '이미 해당 시간대에 예약이 있습니다.' });
            } else {
              // 새로운 예약을 생성
              const book = new Book({
                roomId,
                userId,
                bookDateTime: requestedTime,
                durationHours
              });

              book.save((err) => {
                if (err) {
                  res.status(500).json({ error: '예약을 생성하는 동안 오류가 발생했습니다.' });
                } else {
                  res.status(201).json(book); //예약 성공시 book json을 찍어줌
                }
              });
            }
          }
        );
      } else {
        console.log(req.body)
        res.status(400).json({ error: '선택한 시간대는 예약할 수 없거나 시간 간격이 올바르지 않습니다.' });
      }
    });



export default router;




import express, { application } from "express";
import Book from "../models/Book.js";


const router = express.Router();



// 예약 생성 API

router.post('/',(req,res)=>{
    const {roomId, userId, bookDate, bookTime, durationHours,startTime, endTime} = req.body

    //요청된 시간을 Date 객체로 파싱
    const requestedTime = new Date(bookTime);
    const requestedHour = requestedTime.getHours(); //utc시간으로 할때임.

    // requestedTime.setHours(requestedTime.getHours() + 9); //UTC 시간을 한국시간으로 변환
    
    // const requestedHour = requestedTime.getHours(); //시간 추출 1시간 or 2시간

    //9시부터 21시 사이에 1,2시간 단위로 예약
    if (requestedHour >= 9 && requestedHour <= 21 && (requestedHour - 9) % durationHours === 0) {
        // 중복 예약 확인 (이미 해당 시간대에 예약이 있는지 확인)
        Book.find(
          {
            roomId: roomId,
            bookTime: requestedTime
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
                bookTime: requestedTime,
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

// 예약 조회 API

router.get('/:bookId', async (req, res) => {
  const bookId = req.params.bookId;

  try {
    // MongoDB에서 해당 bookId에 해당하는 예약을 조회
    const book = await Book.findById(bookId).exec();

    if (!book) {
      res.status(404).json({ error: '예약이 없습니다.' });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(500).json({ error: '예약 조회 중 오류가 발생했습니다.' });
  }
});


// 예약 전체 조회 API

router.get('/', async (req, res) => {
    const bookId = req.params.bookId;
  
    try {
      // MongoDB에서 해당 bookId에 해당하는 예약을 조회
      const book = await Book.find(bookId).exec();
  
      if (!book) {
        res.status(404).json({ error: '예약이 없습니다.' });
      } else {
        res.status(200).json(book);
      }
    } catch (error) {
      res.status(500).json({ error: '예약 조회 중 오류가 발생했습니다.' });
    }
  });

// 예약 수정 API

router.put('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const updatedData = req.body; // 수정된 데이터를 요청에서 받음
  
    try {
      // MongoDB에서 해당 bookId에 해당하는 예약을 찾아 수정
      const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true }).exec();
  
      if (!updatedBook) {
        res.status(404).json({ error: '예약이 없습니다.' });
      } else {
        res.status(200).json(updatedBook);
      }
    } catch (error) {
      res.status(500).json({ error: '예약 수정 중 오류가 발생했습니다.' });
    }
  });

router.delete('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
  
    try {
      // MongoDB에서 해당 bookId에 해당하는 예약을 삭제
      const deletedBook = await Book.findByIdAndRemove(bookId).exec();
      if (!deletedBook) {
        res.status(404).json({ error: '예약이 없습니다.' });
      } else {
        res.status(204).json("예약이 정상적으로 삭제되었습니다!")
      }
    } catch (error) {
      res.status(500).json({ error: '예약 삭제 중 오류가 발생했습니다.' });
    }
  });

export default router;






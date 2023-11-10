import express, { application } from "express";
import Book from "../models/Book.js";


const router = express.Router();



// 예약 생성 API

router.post('/', (req, res) => {
  const { roomId, userId, bookDate, bookTime, durationHours } = req.body;

  // bookTime 문자열을 "HH:mm ~ HH:mm" 형식으로 받음
  // 예약 가능한 시간대인지 확인하는 로직이 필요하다면 여기에 추가

  // 중복 예약 확인 (이미 해당 시간대에 예약이 있는지 확인)
  Book.find(
    {
      roomId: roomId,
      bookDate: bookDate,
      bookTime: bookTime // 클라이언트가 보낸 문자열을 그대로 사용
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
          bookDate,
          bookTime, // "HH:mm ~ HH:mm" 형식의 문자열로 저장
          durationHours
        });

        book.save((err) => {
          if (err) {
            res.status(500).json({ error: '예약을 생성하는 동안 오류가 발생했습니다.' });
          } else {
            res.status(201).json(book); // 예약 성공시 book json을 반환
          }
        });
      }
    }
  );
});



// 예약 조회 API 
//bookId-> 로그인할 때 토큰값과 함께주는 id를 안다. 프론트는 
// http://3.36.132.186:8000/api/books/:bookId 
//=> 에서 bookId->id로
router.get('/:id', async (req, res) => {
  const Id = req.params.id;

  try {
    // MongoDB에서 해당 bookId에 해당하는 예약을 조회
    const book = await Book.findById(Id).exec();


    if (!book) {
      res.status(404).json({ error: '예약이 없습니다.' });
    } else {
      res.status(200).json(book);
      console.log(err3)
    }
  } catch (error) {
    res.status(500).json({ error: '예약 조회 중 오류가 발생했습니다.' });
    console.log
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

// 예약 삭제 API `${id}`
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

// 예약 전체 삭제 API
router.delete('/books', async (req, res) => {
  try {
    // MongoDB에서 모든 예약 데이터 삭제
    await Book.deleteMany({}).exec();
    res.status(204).json({ message: "모든 예약이 정상적으로 삭제되었습니다!" });
  } catch (error) {
    res.status(500).json({ error: '예약 삭제 중 오류가 발생했습니다.' });
  }
});



export default router;


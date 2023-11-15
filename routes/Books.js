import express, { application } from "express";
import Book from "../models/Book.js";


const router = express.Router();

// 예약 전체 삭제 API
router.delete('/deleteAll', async (req, res) => {
  try {
    await Book.deleteMany({});
    res.status(200).json({ message: '모든 예약이 삭제되었습니다.' });
  } catch (err) {
    console.error(err);  // 콘솔에 오류 출력
    res.status(500).json({ error: '예약 삭제 중 오류가 발생했습니다.' });
  }
});

// 예약 생성 API
router.post('/', async (req, res) => {
  const { roomId, userId, bookDate, bookTime, durationHours } = req.body;

  // 예약 가능한 시간대 범위 설정 (9시부터 21시까지)
  const validTimeRange = {
    start: 9,
    end: 21
  };

  // 예약 가능한 최대 시간 설정 (1 또는 2시간)
  const maxDurationHours = [1, 2];

  try {
    // bookTime 문자열을 파싱하여 시작 시간과 종료 시간 추출
    const [startTimeStr, endTimeStr] = bookTime.split(' ~ ');
    const startTime = parseInt(startTimeStr, 10);
    const endTime = parseInt(endTimeStr, 10);

    // 예약 가능한 시간대와 최대 시간 검사
    if (
      startTime >= validTimeRange.start &&
      endTime <= validTimeRange.end &&
      maxDurationHours.includes(durationHours)
    ) {
      // 중복 예약 확인 (이미 해당 시간대에 예약이 있는지 확인)
      const existingBookings = await Book.find({
        roomId: roomId,
        bookDate: bookDate,
        bookTime: bookTime
      }).exec();

      if (existingBookings.length > 0) {
        res.status(400).json({ error: '이미 해당 시간대에 예약이 있습니다.' });
      } else {
        // 새로운 예약을 생성
        const book = new Book({
          roomId,
          userId,
          bookDate,
          bookTime,
          durationHours
        });

        book.save((err) => {
          if (err) {
            res.status(500).json({ error: '예약을 생성하는 동안 오류가 발생했습니다.' });
          } else {
            res.status(201).json(book); // 예약 성공시 book JSON 반환
          }
        });
      }
    } else {
      res.status(400).json({ error: '예약이 불가능한 시간대 또는 시간입니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: '예약 생성 중 오류가 발생했습니다.' });
  }
});




// 예약 조회 API 
//bookId-> 로그인할 때 토큰값과 함께주는 id를 안다. 프론트는 
// http://3.36.132.186:8000/api/books/:bookId 
//=> 에서 bookId->id로
// router.get('/:id', async (req, res) => {
//   const Id = req.params.id;

//   try {
//     // MongoDB에서 해당 bookId에 해당하는 예약을 조회
//     const book = await Book.findById(Id).exec();


//     if (!book) {
//       res.status(404).json({ error: '예약이 없습니다.' });
//     } else {
//       res.status(200).json(book);
//       console.log(err3)
//     }
//   } catch (error) {
//     res.status(500).json({ error: '예약 조회 중 오류가 발생했습니다.' });
//     console.log
//   }
// });

// 특정 사용자(ID)의 예약 조회 API
router.get('/:id', async (req, res) => {
  const userId = req.params.id; // 사용자 ID를 추출

  try {
    // MongoDB에서 해당 userId에 해당하는 예약을 조회
    const books = await Book.find({ userId: userId }).exec();

    if (!books || books.length === 0) {
      return res.status(404).json({ error: '해당 사용자의 예약이 없습니다.' }); // return 추가
    } else {
      return res.status(200).json(books); // return 추가
    }
  } catch (error) {
    return res.status(500).json({ error: '예약 조회 중 오류가 발생했습니다.' }); // return 추가
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

// 예약 수정 API `{$bookid}

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

// 예약 하나 삭제 API `${bookid}`
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


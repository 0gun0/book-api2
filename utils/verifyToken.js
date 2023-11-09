import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js"; //오류 미들웨어 .js추가해야 오류안생기더라 파일위치 표시도 확인!

//verify 토큰 ; 인증,인가
// 사용자 인증 미들웨어

// 로그인을 통해 인증된 사용자만 방,예약에 대해 수정,삭제 생성 등의 권한이 있게끔 한다. next 콜백함수

// Verify토큰 
export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user)=>{
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user; //req.user는 다른이름으로 해도됨.
        next()
    });
};

//사용자 검증 미들웨어
export const verifyUser = (req,res,next)=>{
    verifyToken(req,res, next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        } else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}

//관리자 검증 미들웨어
export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res, next, ()=>{   //next 해줘야 작동!!
        if(req.user.isAdmin){
            next()
        } else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}


// AccessToken를 추출하고 해당 토큰을 사용하여 유저 정보를 확인할 미들웨어 함수 

// export const getUserInfoFromToken = (req, res, next) => {
//     // 클라이언트가 Authorization 헤더를 통해 AccessToken을 전달하도록 기대
//     const token = req.headers.authorization;

//     if (!token) {
//       return res.status(401).json({ message: 'AccessToken이 없습니다.' });
//     }

//     // AccessToken 디코딩
//     jwt.verify(token.replace('Bearer ', ''), process.env.JWT, (err, decoded) => {
//       if (err) {
//         return res.status(403).json({ message: '유효하지 않은 AccessToken' });
//       }

//       // 유효한 AccessToken일 경우, 유저 정보 반환
//       req.userInfo = decoded; // 유저 정보를 req 객체에 추가
//       next();
//     });
//   };
  
  // 미들웨어를 사용하여 AccessToken을 사용하여 유저 정보 확인

  export const getUserInfoFromToken = (req, res, next) => {
    // 클라이언트가 Authorization 헤더를 통해 AccessToken을 전달하도록 기대
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'AccessToken이 없습니다.' });
    }
  
    jwt.verify(token.replace('Bearer ', ''), process.env.JWT, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: '유효하지 않은 AccessToken' });
      }
  
      // 유효한 AccessToken일 경우, 유저 정보 반환
      req.userInfo = decoded; // 유저 정보를 req 객체에 추가
      next();
    });
  };
  
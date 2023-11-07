import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config();

// 회원가입 API
export const register = async (req, res, next)=>{
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash, //bcrypt 암호화
            name : req.body.name
        })

        await newUser.save()
        res.status(201).json({message:'회원가입이 완료되었습니다.'})
    }catch(err){
        next(err)
    }
}

// 로그인 API
export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, {message:"존재하지 않는 아이디입니다."}));
  
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password); // user 객체에서 비밀번호 가져오기
      if (!isPasswordCorrect) return next(createError(400, {message:"비밀번호가 일치하지 않습니다."}));

      //JWT 토큰 
      const token = jwt.sign({id:user._id, isAdmin: user.isAdmin},process.env.JWT)
  
      // 필요없이 응답하는 요소 삭제 user._doc임
      const {password, isAdmin, ...otherDetails } = user._doc;
      res.cookie("access_token", token,{
        httpOnly: true,
      }).status(200).json({message:"로그인성공",token:token}); 
    } catch (err) {
      next(err);
    }
  };

  //로그아웃 API

  /** 로그아웃 API */ 

// router.post('/log-out', (req, res, next) => {
//   try {
//       // 클라이언트로부터 JWT 토큰을 받아옵니다.
//       const token = req.headers.authorization.replace('Bearer ', ''); // 프론트에서 req.headers.authorization을 받음
//       // 토큰을 블랙리스트에 추가하여 무효화시킨다.
//       const blacklistedTokens = []; 
//       blacklistedTokens.push(token); // 푸쉬, 블랙리스트에 토큰 추가
//       // res.clearCookie('authorization'); // 클라이언트 쿠키 제거. 'authorization'라는 이름의 쿠키를 클라이언트에서 제거
//       res.status(200).json({ message: '로그아웃 성공' });
//   } catch (error) {
//       // 오류가 발생한 경우 에러 응답을 보냅니다.
//       console.log(error);
//       res.status(500).json({ error: '로그아웃 중 오류가 발생했습니다.' });
//   }
// });
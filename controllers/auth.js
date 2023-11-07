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
      }).status(200).json({message:"로그인성공하셨습니다",token:token}); 
    } catch (err) {
      next(err);
    }
  };

  //로그아웃 API

  /** 로그아웃 API */ 

// 로그아웃 API
export const logout = (req, res) => {
  // 클라이언트로부터 토큰을 받아옵니다.
  const token = req.cookies.access_token;

  // 서버에서 토큰을 무효화하거나 블랙리스트에 추가할 수 있지만,
  // 일반적으로는 새로운 토큰을 클라이언트에게 제공하지 않아 로그아웃 상태로 처리합니다.
  // 클라이언트는 더 이상 유효한 토큰을 갖지 않게 됩니다.

  // 쿠키에서 토큰 제거
  res.clearCookie('access_token');

  // 로그아웃 성공 메시지를 응답으로 전송
  res.status(200).json({ message: '로그아웃 성공하셨습니다' });
};
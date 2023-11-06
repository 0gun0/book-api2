import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config();

export const register = async (req, res, next)=>{
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash, //bcrypt 암호화
        })

        await newUser.save()
        res.status(200).send("User Created!")
    }catch(err){
        next(err)
    }
}

// 로그인 API
export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found!"));
  
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password); // user 객체에서 비밀번호 가져오기
      if (!isPasswordCorrect) return next(createError(400, "Wrong password"));

      //JWT 토큰 
      const token = jwt.sign({id:user._id, isAdmin: user.isAdmin},process.env.JWT)
  
      // 필요없이 응답하는 요소 삭제 user._doc임
      const {password, isAdmin, ...otherDetails } = user._doc;
      res.cookie("access_token", token,{
        httpOnly: true,
      }).status(200).json({...otherDetails});
    } catch (err) {
      next(err);
    }
  };
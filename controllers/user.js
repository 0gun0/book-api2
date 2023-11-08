import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const updateUser = async (req, res, next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {$set : req.body},{new:true})
        res.status(200).json(updatedUser)
    } catch (err){
        next(err); //next 에러 미들웨어
    } 
}

export const deleteUser = async (req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("선택된 유저 삭제완료!");
    } catch (err){
        next(err); //next 에러 미들웨어
    } 
}

export const getUser = async (req, res, next)=>{
    try{
        const users = await User.findById(req.params.id);
        res.status(200).json(users)
    } catch (err){
        next(err); //next 에러 미들웨어
    } 
}

export const getAllUsers = async (req, res, next)=>{

    try{
        const users = await User.find();
        res.status(200).json(users)
    } catch (err){
        next(err); //next 에러 미들웨어
    } 
}

// AccessToken를 추출하고 해당 토큰을 사용하여 유저 정보를 확인할 미들웨어 함수 
export const getUserInfoFromToken = (req, res, next) => {
    // 클라이언트가 Authorization 헤더를 통해 AccessToken을 전달하도록 기대
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'AccessToken이 없습니다.' });
    }

    // AccessToken 디코딩
    jwt.verify(token.replace('Bearer ', ''), process.env.JWT, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: '유효하지 않은 AccessToken' });
      }

      // 유효한 AccessToken일 경우, 유저 정보 반환
      req.userInfo = decoded; // 유저 정보를 req 객체에 추가
      next();
    });
  };
  
  // 미들웨어를 사용하여 AccessToken을 사용하여 유저 정보 확인
  

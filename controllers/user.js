import User from "../models/User.js";

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
        res.status(200).json("선택된 방 삭제완료!");
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
    const newUser = new User(req.body)

    try{
        const users = await User.find();
        res.status(200).json(users)
    } catch (err){
        next(err); //next 에러 미들웨어
    } 
}
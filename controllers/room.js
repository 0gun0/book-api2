import Room from "../models/Room.js";

export const createRoom = async (req, res, next)=>{
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom)
    }catch(err){
        next(err); //next 에러 미들웨어
    } 
}


export const updateRoom = async (req, res, next)=>{
    try{
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, {$set : req.body},{new:true})
        res.status(200).json(updatedRoom)
    } catch (err){
        next(err); //next 에러 미들웨어
    } 
}

export const deleteRoom = async (req, res, next)=>{
    try{
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json("선택된 방 삭제완료!");
    } catch (err){
        next(err); //next 에러 미들웨어
    } 
}

export const getRoom = async (req, res, next)=>{
    try{
        const Rooms = await Room.findById(req.params.id);
        res.status(200).json(Rooms)
    } catch (err){
        next(err); //next 에러 미들웨어
    } 
}

export const getAllRooms = async (req, res, next)=>{
    const newRoom = new Room(req.body)

    try{
        const Rooms = await Room.find();
        res.status(200).json(Rooms)
    } catch (err){
        next(err); //next 에러 미들웨어
    } 
}
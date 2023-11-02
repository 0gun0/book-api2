import express from "express";
import Room from "../models/Room.js"


const router = express.Router();

//CREATE ROOM API
router.post("/", async (req, res)=>{

    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom)
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE ROOM API
router.put("/:id", async (req, res)=>{
    try{
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, {$set : req.body},{new:true})
        res.status(200).json(updatedRoom)
    } catch (err){
        res.status(500).json(err)
    }
})

//DELETE ROOM API
router.delete("/:id", async (req, res)=>{
    try{
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json("선택된 방 삭제완료!");
    } catch (err){
        res.status(500).json(err)
    }
})

//GET ROOM API ++

router.get("/:id", async (req, res)=>{
    try{
        const Room = await Room.findById(
        req.params.id);
        res.status(200).json(Room)
    } catch (err){
        res.status(500).json(err)
    }
})

//GET ALL ROOMS API

router.get("/", async (req, res)=>{
    try{
        const Rooms = await Room.find();
        res.status(200).json(Rooms)
    } catch (err){
        res.status(500).json(err)
    }
})



export default router;
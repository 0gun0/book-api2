import express from "express";
import {createRoom,
        updateRoom,
        deleteRoom,
        getRoom,
        getAllRooms} from "../controllers/room.js"
// import Room from "../models/Room.js" 리팩토링
// import { createError } from "../utils/error.js";

const router = express.Router();

//CREATE ROOM API
router.post("/", createRoom);

//UPDATE ROOM API
router.put("/:id", updateRoom);

//DELETE ROOM API
router.delete("/:id", deleteRoom);

//GET ROOM API ++

router.get("/:id", getRoom);

//GET ALL ROOMS API

router.get("/", getAllRooms);


export default router;
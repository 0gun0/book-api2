import express from "express";
import {createRoom,
        updateRoom,
        deleteRoom,
        getRoom,
        getAllRooms} from "../controllers/room.js"
// import Room from "../models/Room.js" 리팩토링
// import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE ROOM API
router.post("/", verifyAdmin, createRoom);

//UPDATE ROOM API
router.put("/:id", verifyAdmin, updateRoom);

//DELETE ROOM API
router.delete("/:id", verifyAdmin, deleteRoom);

//GET ROOM API ++

router.get("/:id", getRoom);

//GET ALL ROOMS API

router.get("/", verifyAdmin, getAllRooms);


export default router;
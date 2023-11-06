import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers} from "../controllers/user.js"
import { verifyToken, verifyUser,verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

// Authentication 
router.get("/checkAuthentication", verifyToken, (req, res, next)=>{
    res.send("hello user, you are logged in")
})

router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
    res.send("hello user, you are logged in and can update and delete")
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
    res.send("hello user, you are the king in the north!!")
})

//UPDATE ROOM API
router.put("/:id", verifyUser, updateUser);

//DELETE ROOM API
router.delete("/:id", verifyUser, deleteUser);

//GET ROOM API ++

router.get("/:id", verifyUser, getUser);

//GET ALL ROOMS API

router.get("/", verifyAdmin, getAllUsers);

export default router;
import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers} from "../controllers/user.js"

const router = express.Router();

//UPDATE ROOM API
router.put("/:id", updateUser);

//DELETE ROOM API
router.delete("/:id", deleteUser);

//GET ROOM API ++

router.get("/:id", getUser);

//GET ALL ROOMS API

router.get("/", getAllUsers);

export default router;
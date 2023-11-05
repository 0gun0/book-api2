import express from "express";
import { register } from "../controllers/auth.js";

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("hello! world. CONNECTED!")
})

//사용자 인증 미들웨어

router.post("/register", register)


export default router;
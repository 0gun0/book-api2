import express from "express";
import { register,login } from "../controllers/auth.js";

const router = express.Router();

//연결되었는지 확인차 
router.get("/",(req,res)=>{
    res.send("hello! world. CONNECTED!")
})

//사용자 인증,인가 미들웨어

// 회원가입 API
router.post("/register", register)

// 로그인 API
router.post("/login", login)

export default router;
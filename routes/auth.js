import express from "express";

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("hello! world. CONNECTED!")
})

//사용자 인증 미들웨어


export default router;
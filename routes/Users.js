import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers} from "../controllers/user.js"
import { verifyToken, verifyUser,verifyAdmin,getUserInfoFromToken } from "../utils/verifyToken.js"

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

//UPDATE USER API
router.put("/:id", verifyUser, updateUser);

//DELETE USER API
router.delete("/:id", verifyUser, deleteUser);



  // API 엔드포인트: 유저 정보 확인

//USER 토큰을 이용해서 정보조회하는 API 
router.get("/userinfo2", getUserInfoFromToken, (req,res) => {
    res.json({userInfo: req.userInfo});
})

//USER 토큰을 이용해서 username만 가져오는 API
router.get('/userinfo', getUserInfoFromToken, (req, res) => {
    res.json({ userInfo: userInfo.username });
  });

router.get('/userinfo', getUserInfoFromToken, (req, res) => {
  const userInfo = req.userInfo;
  res.json({ username: userInfo.username }); // userInfo에서 username 필드를 반환
});

//GET USER API ++

router.get("/:id", verifyUser, getUser);

//GET ALL USERS API

router.get("/", verifyAdmin, getAllUsers);

router.get("/info", getUserInfoFromToken, getAllUsers);



export default router;


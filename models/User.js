import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, // username , password는 회원가입, 로그인할 때 필요해서 했던 건데 필요한가?
    name:{
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default : false,
    }
//성별, 유저 이미지, 자기소개 등등 추가 가능? gender, photos, profile, MBTI etc, authorization
},{timestamps:true});

export default mongoose.model("User", UserSchema)

import mongoose from 'mongoose';

mongoose.set('strictQuery', true); //에러안떠 무슨뜻?

const RoomSchema = new mongoose.Schema({
    roomName:{
        type: String,
        required: true
    },
    desc: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
    }
});

export default mongoose.model("Room", RoomSchema)
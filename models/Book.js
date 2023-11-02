import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookSchema = new mongoose.Schema({
    roomId:{
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    },
    bookDateTime: {
        type: Date,
        required: true
    },
    durationHours: {
        type: Number,
		required: true
    }
},{timestamps:true});

export default mongoose.model("Book", BookSchema);


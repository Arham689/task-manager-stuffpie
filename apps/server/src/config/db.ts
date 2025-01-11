import mongoose from "mongoose";

export const dbConnect = async (url : string)=>{
    mongoose.connect(url)
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.error(err));
}
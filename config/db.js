import mongoose from "mongoose";

const connect = async ()=>{
    try{
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log("connection successfully ")
    }
    catch(err){
        console.log("err while connection",err)
    }
}

export default connect
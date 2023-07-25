import { compairPassword, hashPassword } from "../helpers/authHelper.js"
import usermodal from "../models/usermodel.js"
import JWT from "jsonwebtoken"
export const registerControllar = async(req,res)=>{
    try{

        const {name,email,password,phone,address} = req.body
        if(!name){
            return res.send({error : "Name is required"})
        }
        if(!email){
            return res.send({error : "email is required"})
        }
        if(!password){
            return res.send({error : "password is required"})
        }
        if(!phone){
            return res.send({error : "phone is required"})
        }
        if(!address){
            return res.send({error : "address is required"})
        }

        //check User
        const Existinguser = await usermodal.findOne({email})
        if(Existinguser){
            return res.status(200).send({
                success : true,
                message :"allready registed"
            })
        }
        const hashedPassword = await hashPassword(password)
        
        //  Save 
        const user = await new usermodal({name,email,address,phone,password : hashedPassword}).save()

        res.status(200).send({
            success : true,
            message : "user register successfully",
            user
        })

    }
    catch(error){
        console.log("register Error ")
        res.status(500).send({
            success : false,
            message : "err while registeration",
            error
        })
    }
}

export const loginControllar = async(req,res)=>{
    try{
        const {email,password}  = req.body
        if(!email || !password){
            res.status(404).send({
                success : false,
                message : "Invaild user "

            })
        }
            // check user
            const user = await usermodal.findOne({email})
            if(!user){
                return res.status(404).send({

                     success : false,
                    message : "Email is not registed"
                })
            }

        const match = await compairPassword(password,user.password)

        if(!match){
            return res.status(200).send({
                success : false,
                message : "Invalid Password"
            })
        }
        // TOKEN
        const token = await JWT.sign({_id : user._id},process.env.JWT_SECREAT,{expiresIn :"7d"})  
        res.status(200).send({
            success : true,
            message : "Login successfully",
            user :{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },token
        })
    }
    catch(error) {
        console.error("Error occurred during login:", error);
        res.status(500).send({
            success: false,
            message: "Error while login.....",
            error
        });
    }
}

export const testconrollar = (req,res)=>{
    console.log("protected ROute")
    res.send("protected ROute")
}

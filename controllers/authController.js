import userModel from "../models/userModel.js"
import { hashPassword } from "../helpers/authHelper.js";

export const registerController=async (req,res)=>{
    try {
        const {name,email,password,phone,address} =req.body;

        if(!name){
            return res.send({error:"Name is required"})
        }
        if(!email){
            return res.send({error:"email is required"})
        }
        if(!password){
            return res.send({error:"password is required"})
        }
        if(!phone){
            return res.send({error:"phone is required"})
        }
        if(!address){
            return res.send({error:"address is required"})
        }

        const existingUser=await userModel.findOne({email})

        if(existingUser){
            return res.status(200).send({
                success:true,
                message:"already registerd"
            })
        }

        const hashedPassword=await hashPassword(password)

        const user=await new userModel({name,email,phone,address,password:hashedPassword}).save();

        res.status(201).send({
            success:true,
            message:"User register succefully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in registration",
            error
        })
    }
}
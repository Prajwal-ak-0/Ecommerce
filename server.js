import express from "express";
import colors from "colors"
import dotenv from 'dotenv'
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("<h1>E-Commerce</h1>")
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running".bgBlack.white)
})
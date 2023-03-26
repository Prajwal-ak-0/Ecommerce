import express from "express";
import morgan from "morgan"
import colors from "colors"
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app=express()

app.use(cors());
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product", productRoutes);


app.get('/',(req,res)=>{
    res.send("<h1>Prajwal</h1>")
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running".bgBlack.white)
})
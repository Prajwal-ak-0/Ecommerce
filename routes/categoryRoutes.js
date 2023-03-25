import express from "express"
import { createCategoryController, updateCategoryController } from "../controllers/categoryController.js";
import {isAdmin,requireSignIn} from "./../middlewares/authMiddleware.js"

const router=express.Router();

router.post("/create-category",requireSignIn,isAdmin,createCategoryController)

router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController)

export default router
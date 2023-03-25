import categoryModels from "../models/categoryModels.js";
import slugify from "slugify";
export const createCategoryController=async (req,res)=>{
    try {
        const {name} =req.body;
        if(!name){
            return res.status(401).send({message:"Name is required"})
        }
        const existingCategory=await ss.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Categpry already Exist"
            })
        }
        const category=await new ss({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:"new category created",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Category"
        })
    }
}

export const updateCategoryController=async (req,res)=>{
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModels.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
        );
        res.status(200).send({
        success: true,
        messsage: "Category Updated Successfully",
        category,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating Category"
        })
    }
}
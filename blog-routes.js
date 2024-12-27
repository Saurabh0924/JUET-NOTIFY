import express from "express";
const blogrouter= express.Router();
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getById,
  getByUserId,
  updateBlog,
} from "../controllers/blog-controller.js";

blogrouter.get("/", getAllBlogs);
blogrouter.post("/add", addBlog);
blogrouter.put("/update/:id", updateBlog);
blogrouter.get("/:id", getById);
blogrouter.delete("/:id", deleteBlog);
blogrouter.get("/user/:id", getByUserId);


export default blogrouter;

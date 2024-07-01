import { Schema, model } from "mongoose";
import { TBlog } from "../interface/blog.interface";

const blogSchema = new Schema<TBlog>({
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  content: String,
  tags: {
    type: [String],
  },
  category: {
    type: String,
  },
  status: {
    type: String,
    enum: ["draft", "publish"],
    default: "draft",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Blog = model<TBlog>("Blog", blogSchema);
export default Blog;

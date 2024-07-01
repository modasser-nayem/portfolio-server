import { Schema, model } from "mongoose";
import { TProject } from "../interface/project.interface";

const projectSchema = new Schema<TProject>({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  about: String,
  description: String,
  technology: {
    type: [String],
  },
  features: {
    type: [String],
  },
  code: {
    client: String,
    server: String,
  },
  preview: {
    type: String,
  },
  order: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Project = model<TProject>("Project", projectSchema);
export default Project;

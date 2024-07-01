import { Schema, model } from "mongoose";
import { IInformation } from "../interface/information.interface";

const informationSchema = new Schema<IInformation>({
  name: {
    type: String,
  },
  title: [{ type: String }],
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  resume: {
    type: String,
  },
  about: {
    type: String,
  },
  speech: {
    type: String,
  },
  images: {
    introduction: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    github: String,
    discord: String,
    youtube: String,
    whatsapp: String,
    fiver: String,
    upwork: String,
  },
  sortDescriptions: {
    introduction: {
      type: String,
    },
    about: {
      type: String,
    },
    skill: {
      type: String,
    },
    project: {
      type: String,
    },
    service: {
      type: String,
    },
    blog: {
      type: String,
    },
    testimonial: {
      type: String,
    },
    contact: {
      type: String,
    },
  },
});

const Information = model<IInformation>("Information", informationSchema);

export default Information;

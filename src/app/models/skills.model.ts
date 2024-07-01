import { Schema, model } from "mongoose";
import { TSkill } from "../interface/skill.interface";

const skillSchema = new Schema<TSkill>({
  name: {
    type: String,
    unique: true,
  },
  icon: {
    type: String,
  },
  stack: {
    type: String,
  },
  order: {
    type: Number,
  },
});

const Skill = model<TSkill>("Skill", skillSchema);
export default Skill;

import AppError from "../error/AppError";
import { TSkill } from "../interface/skill.interface";
import Skill from "../models/skills.model";

// get all skill
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSkillsFormDB = async (payload: { query?: Record<string, any> }) => {
  const query = payload?.query;
  const filter = query?.stack ? { stack: new RegExp(query.stack, "i") } : {};

  const result = await Skill.find(filter);

  return result;
};

// get all skill
const getSingleSkillFormDB = async (id: string) => {
  const result = await Skill.findById(id);
  return result;
};

// create new skill
const createNewSkillIntoDB = async (data: TSkill) => {
  if (await Skill.findOne({ name: data.name })) {
    throw new AppError(400, "Skill already exist!");
  }

  if (!data.order) {
    const count = await Skill.countDocuments();
    data.order = count + 1;
  }

  const result = await Skill.create(data);

  return result;
};

const updateSkillIntoDB = async (id: string, data: Partial<TSkill>) => {
  if (!(await Skill.findById(id))) {
    throw new AppError(404, "Skill not found, invalid id");
  }
  if (data.name) {
    if (await Skill.findOne({ title: data.name })) {
      throw new AppError(400, "Skill already exist!");
    }
  }
  const result = await Skill.findByIdAndUpdate(id, data, { new: true });

  return result;
};

const deleteSkillIntoDB = async (id: string) => {
  if (!(await Skill.findById(id))) {
    throw new AppError(404, "Skill not found, invalid id");
  }
  await Skill.findByIdAndDelete(id);

  return null;
};

const skillServices = {
  getSkillsFormDB,
  getSingleSkillFormDB,
  createNewSkillIntoDB,
  updateSkillIntoDB,
  deleteSkillIntoDB,
};

export default skillServices;

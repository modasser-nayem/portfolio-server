import { z } from "zod";

const createSkillValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .refine((value) => value !== "", {
        message: "Please provide skill name",
      }),
    icon: z
      .string({ required_error: "Icon link is required" })
      .refine((value) => value !== "", {
        message: "Please provide skill icon link",
      }),
    stack: z
      .string({ required_error: "Stack name is required" })
      .refine((value) => value !== "", {
        message: "Please provide stack name",
      }),
    order: z
      .number()
      .min(1, { message: "Skill order number can't be less then 1" })
      .optional(),
  }),
});

const updateSkillValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide skill name",
      })
      .optional(),
    icon: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide skill icon link",
      })
      .optional(),
    stack: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide stack name",
      })
      .optional(),
    order: z
      .number()
      .min(1, { message: "Skill order number can't be less then 1" })
      .optional(),
  }),
});

const skillValidationSchemas = {
  createSkillValidationSchema,
  updateSkillValidationSchema,
};

export default skillValidationSchemas;

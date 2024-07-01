import { z } from "zod";

const createServiceSchemaValidation = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .refine((value) => value !== "", {
        message: "Please provide service name",
      }),
    icon: z
      .string({ required_error: "Icon link is required" })
      .refine((value) => value !== "", {
        message: "Please provide service icon link",
      }),
    description: z
      .string({ required_error: "description is required" })
      .refine((value) => value !== "", {
        message: "Please provide description",
      }),
    order: z
      .number()
      .min(1, { message: "service order number can't be less then 1" })
      .optional(),
  }),
});

const updateServiceSchemaValidation = z.object({
  body: z.object({
    name: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide service name",
      })
      .optional(),
    icon: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide service icon link",
      })
      .optional(),
    description: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide description",
      })
      .optional(),
    order: z
      .number()
      .min(1, { message: "service order number can't be less then 1" })
      .optional(),
  }),
});

const serviceSchemaValidations = {
  createServiceSchemaValidation,
  updateServiceSchemaValidation,
};

export default serviceSchemaValidations;

import { z } from "zod";

const createProjectSchemaValidation = z.object({
  body: z.object({
    title: z
      .string({ required_error: "title is required" })
      .refine((value) => value !== "", { message: "title is required" }),
    image: z.string().url({ message: "Invalid url" }).optional(),
    about: z
      .string({ required_error: "about is required" })
      .refine((value) => value !== "", {
        message: "about is required",
      }),
    description: z
      .string()
      .refine((value) => value !== "", {
        message: "description is not empty",
      })
      .optional(),
    technology: z
      .array(
        z.string().refine((value) => value !== "", {
          message: "Technology name not empty",
        }),
        { required_error: "Technology is required" }
      )
      .refine((value) => value.length >= 2, {
        message: "Please provide at least two technology name",
      }),
    features: z
      .array(
        z.string().refine((value) => value !== "", {
          message: "Features not empty",
        }),
        { required_error: "Features is required" }
      )
      .refine((value) => value.length >= 2, {
        message: "Please provide at least two features",
      }),
    code: z.object(
      {
        client: z
          .string()
          .url({ message: "Invalid url" })
          .refine((value) => value !== "", {
            message: "Please provide client code link",
          })
          .optional(),
        server: z
          .string()
          .url({ message: "Invalid url" })
          .refine((value) => value !== "", {
            message: "Please provide server code link",
          })
          .optional(),
      },
      { required_error: "Project code is required" }
    ),
    preview: z
      .string()
      .url({ message: "Invalid url" })
      .refine((value) => value !== "", {
        message: "preview is not empty",
      })
      .optional(),
    order: z
      .number()
      .min(1, { message: "Order number can't be less then 1" })
      .optional(),
  }),
});

const updateProjectSchemaValidation = z.object({
  body: z.object({
    title: z
      .string()
      .refine((value) => value !== "", { message: "Please provide title" })
      .optional(),
    image: z.string().url({ message: "Invalid image url" }).optional(),
    about: z
      .string()
      .refine((value) => value !== "", {
        message: "about is not empty",
      })
      .optional(),
    description: z
      .string()
      .refine((value) => value !== "", {
        message: "description is not empty",
      })
      .optional(),
    technology: z
      .array(
        z.string().refine((value) => value !== "", {
          message: "Technology name is not empty",
        })
      )
      .optional(),
    features: z
      .array(
        z.string().refine((value) => value !== "", {
          message: "Feature is not empty",
        })
      )
      .optional(),
    code: z
      .object({
        client: z
          .string()
          .refine((value) => value !== "", {
            message: "Please provide client code link",
          })
          .optional(),
        server: z
          .string()
          .refine((value) => value !== "", {
            message: "Please provide server code link",
          })
          .optional(),
      })
      .optional(),
    preview: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide preview link",
      })
      .optional(),
    order: z
      .number()
      .min(1, { message: "Order number can't be less then 1" })
      .optional(),
  }),
});

const projectSchemaValidations = {
  createProjectSchemaValidation,
  updateProjectSchemaValidation,
};

export default projectSchemaValidations;

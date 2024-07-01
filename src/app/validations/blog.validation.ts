import { z } from "zod";

const createBlogSchemaValidation = z.object({
  body: z.object({
    title: z
      .string({ required_error: "title is required" })
      .refine((value) => value !== "", { message: "title is required" }),
    thumbnail: z
      .string({ required_error: "thumbnail is required" })
      .url({ message: "Invalid url" })
      .refine((value) => value !== "", {
        message: "thumbnail is required",
      }),
    content: z
      .string({ required_error: "content is required" })
      .refine((value) => value !== "", {
        message: "content is required",
      }),
    category: z
      .string({ required_error: "category is required" })
      .refine((value) => value !== "", {
        message: "category is required",
      }),
    status: z.enum(["draft", "publish"]).optional(),
    tags: z
      .array(
        z.string().refine((value) => value !== "", {
          message: "tag name not empty",
        }),
        { required_error: "tags is required" }
      )
      .refine((value) => value.length >= 2, {
        message: "Please provide at least two tags name",
      }),
  }),
});

const updateBlogSchemaValidation = z.object({
  body: z.object({
    title: z
      .string()
      .refine((value) => value !== "", { message: "title is required" })
      .optional(),
    thumbnail: z
      .string()
      .url({ message: "Invalid url" })
      .refine((value) => value !== "", {
        message: "thumbnail is required",
      })
      .optional(),
    content: z
      .string()
      .refine((value) => value !== "", {
        message: "content is required",
      })
      .optional(),
    category: z
      .string()
      .refine((value) => value !== "", {
        message: "category is required",
      })
      .optional(),
    status: z.enum(["draft", "publish"]).optional(),
    tags: z
      .array(
        z.string().refine((value) => value !== ""),
        { required_error: "tags is required" }
      )
      .refine((value) => value.length >= 2, {
        message: "Please provide at least two tags name",
      })
      .optional(),
  }),
});

const blogSchemaValidations = {
  createBlogSchemaValidation,
  updateBlogSchemaValidation,
};

export default blogSchemaValidations;

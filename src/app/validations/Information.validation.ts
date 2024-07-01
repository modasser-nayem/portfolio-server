import { z } from "zod";

const updateIntroductionValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide your name",
      })
      .optional(),
    title: z.array(
      z.string().refine((value) => value !== "", {
        message: "Please provide your name",
      })
    ),
    image: z
      .string()
      .url({ message: "Invalid imgage url" })
      .refine((value) => value !== "", {
        message: "Please provide image url",
      })
      .optional(),
  }),
});

const updateAboutValidationSchema = z.object({
  body: z.object({
    about: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide about details",
      })
      .optional(),
    speech: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide speech",
      })
      .optional(),
    image: z
      .string()
      .url({ message: "Invalid imgage url" })
      .refine((value) => value !== "", {
        message: "Please provide image url",
      })
      .optional(),
  }),
});

const updateContactInfoValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }).optional(),
    phone: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide your phone number",
      })
      .optional(),
    resume: z
      .string()
      .refine((value) => value !== "", {
        message: "Please provide your resume link",
      })
      .optional(),
    socialMedia: z
      .object({
        facebook: z
          .string()
          .refine((value) => value !== "", {
            message: "Please provide your facebook profile link",
          })
          .optional(),
        instagram: z
          .string()
          .refine((value) => value !== "", {
            message: "Please provide your instagram profile link",
          })
          .optional(),
        twitter: z
          .string()
          .refine((value) => value !== "", {
            message: "Please provide your twitter profile link",
          })
          .optional(),
        linkedin: z
          .string()
          .refine((value) => value !== "", {
            message: "Please provide your linkedin profile link",
          })
          .optional(),
        github: z
          .string()
          .refine((value) => value !== "", {
            message: "Please provide your github profile link",
          })
          .optional(),
        discord: z
          .string()
          .refine((value) => value !== "", {
            message: "Please provide your discord profile link",
          })
          .optional(),
        youtube: z
          .string()
          .refine((value) => value !== "", {
            message: "Please provide your youtube profile link",
          })
          .optional(),
        whatsapp: z
          .string()
          .refine((value) => value !== "", {
            message: "Please provide your whatsapp profile link",
          })
          .optional(),
        fiver: z
          .string()
          .refine((value) => value !== "", {
            message: "Please provide your fiver profile link",
          })
          .optional(),
        upwork: z
          .string()
          .refine((value) => value !== "", {
            message: "Please provide your upwork profile link",
          })
          .optional(),
      })
      .optional(),
  }),
});

const updateSortDescriptionValidationSchema = z.object({
  body: z.object({
    introduction: z
      .string()
      .refine((value) => value !== "", {
        message: "Provide introduction description",
      })
      .optional(),
    about: z
      .string()
      .refine((value) => value !== "", {
        message: "Provide about description",
      })
      .optional(),
    skill: z
      .string()
      .refine((value) => value !== "", {
        message: "Provide skill description",
      })
      .optional(),
    project: z
      .string()
      .refine((value) => value !== "", {
        message: "Provide project description",
      })
      .optional(),
    service: z
      .string()
      .refine((value) => value !== "", {
        message: "Provide service description",
      })
      .optional(),
    blog: z
      .string()
      .refine((value) => value !== "", {
        message: "Provide blog description",
      })
      .optional(),
    testimonial: z
      .string()
      .refine((value) => value !== "", {
        message: "Provide testimonial description",
      })
      .optional(),
    contact: z
      .string()
      .refine((value) => value !== "", {
        message: "Provide contact description",
      })
      .optional(),
  }),
});

const informationValidationSchemas = {
  updateIntroductionValidationSchema,
  updateAboutValidationSchema,
  updateContactInfoValidationSchema,
  updateSortDescriptionValidationSchema,
};

export default informationValidationSchemas;

import { z } from "zod";

export const SignInSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please provide a valid email address." }),
  
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long. " })
      .max(100, { message: "Password cannot exceed 100 characters." }),
  });
  
export const SignUpSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." })
      .max(30, { message: "Username cannot exceed 30 characters." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores.",
      }),
  
    name: z
      .string()
      .min(1, { message: "Name is required." })
      .max(50, { message: "Name cannot exceed 50 characters." })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Name can only contain letters and spaces.",
      }),
  
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Please provide a valid email address." }),
  
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(100, { message: "Password cannot exceed 100 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
  });



  // Define a custom schema for file uploads
  const FileSchema = z.instanceof(File);
  
  // Define a custom schema for subunits
  const SubunitSchema = z.object({
      name: z.string().min(2).max(100),
      brandname: z.string().min(2).max(100).optional(),
      modelname: z.string().min(2).max(100).optional(),
      serialNumber: z.string().min(2).max(25).optional(),
      assetTag: z.string().min(2).max(25).optional(),
  });
  
  export const EquipmentSchema = z.object({
      name: z.string().min(2).max(100),
      brandname: z.string().min(2).max(100).optional(),
      modelname: z.string().min(2).max(100).optional(),
      serialNumber: z.string().min(2).max(25).optional(),
      assetTag: z.string().min(2).max(25).optional(),
      subunits: z.array(SubunitSchema).optional(),
      labNumber: z.string().min(2).max(100),
      customLabNumber: z.string().optional(),
      labName: z.string().min(2).max(100).optional(),
      team: z.string().min(2).max(25),
      serviceDate: z.date().optional(),
      category: z.string().min(2).max(100),
      customCategory: z.string().optional(),
      comment: z.string().min(2).max(150).optional(),
      imgUrl: z.union([z.string(), FileSchema, z.undefined()]).optional(),
      amount: z.number().int().min(1).max(1000).optional(),
      
    }).refine(
      (data) => !(data.category === "other" && (!data.customCategory || data.customCategory.trim() === "")),
      {
        message: "Custom category is required when 'Other' is selected",
        path: ["customCategory"],
      }
    ).refine(
      (data) => !(data.labNumber === "other" && (!data.customLabNumber || data.customLabNumber.trim() === "")),
      {
        message: "Custom lab number is required when 'Other' is selected",
        path: ["customLabNumber"],
      }
    );
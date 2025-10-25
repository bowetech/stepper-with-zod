import { z } from "zod";

export const propertyTypeSchema  = z.object({
accommodation: z
   .string("Please select a property type")
   .min(1, "Please select property type"),

 });

export const privacyTypeSchema  = z.object({
privacy: z
   .string("Please select a property type")
   .min(1, "Please select a privacy type"),

 });




export const Step1Schema  = z.object({
  // name: z
  //   .string()
  //   .min(2, "Name must be at least 2 characters")
  //   .max(100, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
    
propertyType: z
    .string()
    .min(1, "propertyType is required"),
   

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  });
 

export const Step2Schema   = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),    
  address: z
    .string()
    .min(2, "Address must be at least 2 characters")
    .max(100, "Address is too long"),  
  });


  export const Step3Schema   = z.object({
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country is too long"),  
  });



export const FormDataSchema = propertyTypeSchema.merge(privacyTypeSchema).merge(Step1Schema).merge(Step2Schema).merge(Step3Schema);

export type Inputs = z.infer<typeof FormDataSchema>; // TS type from schema

      
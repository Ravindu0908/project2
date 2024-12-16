const { z } = require("zod");

// add product schema
const addProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name field has to be filled." })
    .max(50, { message: "Name should contain maximum 50 characters." }),
  productCode: z
    .string()
    .min(1, { message: "Product code field has to be filled." })
    .max(10, { message: "Product code should contain maximum 10 characters." }),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number." })
    .refine((val) => val !== undefined, {
      message: "Price field has to be filled.",
    })
    .refine((val) => !isNaN(val), {
      message: "Price must be a number.",
    })
    .refine((val) => val > 0, {
      message: "Price must be greater than 0.",
    }),
  stock: z.coerce
    .number({ invalid_type_error: "Stock must be a number." })
    .refine((val) => val !== undefined, {
      message: "Stock field has to be filled.",
    }),
  description: z
    .string()
    .min(1, { message: "Description field has to be filled." })
    .max(500, {
      message: "Description should contain maximum 500 characters.",
    }),
});

const addServicesSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name field has to be filled." })
    .max(50, { message: "Name should contain maximum 50 characters." }),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number." })
    .refine((val) => val !== undefined, {
      message: "Price field has to be filled.",
    }),
  description: z
    .string()
    .min(1, { message: "Description field has to be filled." })
    .max(500, {
      message: "Description should contain maximum 500 characters.",
    }),
  beauticians: z
    .array(z.string().min(1, { message: "Beautician field has to be filled." }))
    .min(1, {
      message: "At least one beautician required.",
    }),
});

const addPackageSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name field has to be filled." })
    .max(50, { message: "Name should contain maximum 50 characters." }),
  description: z
    .string()
    .min(1, { message: "Description field has to be filled." })
    .max(500, {
      message: "Description should contain maximum 500 characters.",
    }),
  services: z
    .array(z.string().min(1, { message: "Service field has to be filled." }))
    .min(1, {
      message: "At least one service required.",
    }),
  branches: z
    .array(z.string().min(1, { message: "Branch field has to be filled." }))
    .min(1, {
      message: "At least one branch required.",
    }),
  normalPrice: z.coerce
    .number({
      invalid_type_error: "Normal price must be a number.",
    })
    .refine((val) => val !== undefined, {
      message: "Normal price field has to be filled.",
    })
    .refine((val) => !isNaN(val), {
      message: "Normal price must be a number.",
    })
    .refine((val) => val > 0, {
      message: "Normal price must be greater than 0.",
    }),
  discountedPrice: z.coerce
    .number({
      invalid_type_error: "Discounted price must be a number.",
    })
    .refine((val) => val !== undefined, {
      message: "Discounted price field has to be filled.",
    })
    .refine((val) => !isNaN(val), {
      message: "Discounted price must be a number.",
    })
    .refine((val) => val > 0, {
      message: "Discounted price must be greater than 0.",
    }),
});

module.exports = {
  addProductSchema,
  addServicesSchema,
  addPackageSchema,
};

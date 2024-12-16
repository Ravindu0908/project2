const { z } = require("zod");

// email validation schema
const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email field has to be filled." })
    .email("This is not a valid email."),
});

// appointment validation schema
const addAppointmentSchema = z.object({
  date: z.coerce
    .date()
    .refine((date) => {
      return !!date;
    }, "Date is required")
    .refine((date) => {
      return date >= new Date();
    }, "Date must be greater than or equal to today")
    .refine((date) => {
      // get date 1 month from now
      const lastDate = new Date();
      lastDate.setMonth(lastDate.getMonth() + 1);

      return date <= lastDate;
    }, "Date must be less than or equal to 1 months from now"),
  timeSlot: z.string().min(1, { message: "Time slot field has to be filled." }),
  service: z.string().min(1, { message: "Service field has to be filled." }),
});

//update password schema
const updatePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "Old password field has to be filled." }),
    newPassword: z
      .string()
      .min(1, { message: "New password field has to be filled." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password field has to be filled." }),
  })
  .refine((data) => {
    return data.newPassword === data.confirmPassword;
  }, "Passwords do not match.");

const checkOutProductsSchema = z.object({
  products: z.array(
    z.object({
      productId: z.string({
        message: "Product id is required.",
      }),
      quantity: z.coerce.number({
        message: "Quantity is required.",
      }),
    })
  ),
  address: z.string({
    message: "Address is required.",
  }),
  street: z.string({
    message: "Street is required.",
  }),
  city: z.string({
    message: "City is required.",
  }),
  state: z.string({
    message: "State is required.",
  }),
  zipCode: z.string({
    message: "Zip code is required.",
  }),
});

// updateAccount schema
const updateAccountSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name field has to be filled." }),
  lastName: z.string().min(1, { message: "Last name field has to be filled." }),
  email: z
    .string()
    .min(1, { message: "Email field has to be filled." })
    .email("This is not a valid email."),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number should contain minimum 10 digits." })
    .max(12, {
      message: "Phone number should contain maximum 12 digits.",
    }),
});

// finish the appointment with review
const finishAppointmentSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Rating should be between 1 and 5." })
    .max(5, { message: "Rating should be between 1 and 5." }),
  comment: z.string().min(1, { message: "Comment field has to be filled." }),
});

// apply leave schema
const applyLeaveSchema = z.object({
  startDate: z.coerce
    .date()
    .refine((date) => {
      return !!date;
    }, "Start date is required")
    .refine((date) => {
      return date >= new Date();
    }, "Start date must be greater than or equal to today")
    .refine((date) => {
      // get date 1 month from now
      const lastDate = new Date();
      lastDate.setMonth(lastDate.getMonth() + 1);

      return date <= lastDate;
    }, "Start date must be less than or equal to 1 months from now"),
  endDate: z.coerce
    .date()
    .refine((date) => {
      return !!date;
    }, "End date is required")
    .refine((date) => {
      return date >= new Date();
    }, "End date must be greater than or equal to today")
    .refine((date) => {
      // get date 1 month from now
      const lastDate = new Date();
      lastDate.setMonth(lastDate.getMonth() + 1);

      return date <= lastDate;
    }, "End date must be less than or equal to 1 months from now"),
  reason: z.string().min(1, { message: "Reason field has to be filled." }),
});

module.exports = {
  emailSchema,
  addAppointmentSchema,
  updatePasswordSchema,
  checkOutProductsSchema,
  updateAccountSchema,
  finishAppointmentSchema,
  applyLeaveSchema,
};

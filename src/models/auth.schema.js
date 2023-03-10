import joi from "joi";


export const userSchema = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().email().required().min(3),
    password: joi.string().required().min(3),
    confirmPassword:joi.string().required().min(3)
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

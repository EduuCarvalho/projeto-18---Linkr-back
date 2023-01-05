import joi from "joi";

export const SignUpSchema = joi.object({
    
    email:joi.string().email().max(30).required(),
    password:joi.string().required(),
    name:joi.string().max(30).required(),
    pictureurl:joi.string().required()
    })


export const signInSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
})
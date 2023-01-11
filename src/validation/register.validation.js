import  Joi  from "joi-browser"

const registerSchema={
    name:Joi.string().min(2).max(100).required().label("Name"),
    email:Joi.string().email().min(6).max(100).required().label("Email"),
    password:Joi.string().min(6).max(20).required().label("Password"),
}
export default registerSchema
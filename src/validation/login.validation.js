import  Joi  from "joi-browser"

const loginSchema={
    email:Joi.string().email().min(6).max(100).required().label("Email"),
    password:Joi.string().min(6).max(20).required().label("Password"),
}
export default loginSchema
import Joi from "joi-browser";

const cardSchema = {
  //   _id: Joi.string(),
  title: Joi.string().min(2).max(255).required(),
  subTitle: Joi.string().min(2).max(255).required(),
  description: Joi.string().min(2).max(1024).required(),
  address: Joi.string().min(2).max(400).required(),
  phone: Joi.string()
    .min(9)
    .max(10)
    .required()
    .regex(/^0[2-9]\d{7,8}$/),
  url: Joi.string().min(11).max(1024).uri().allow(""),
  alt: Joi.string().allow("").min(2).max(1024).uri(),
};
export default cardSchema;

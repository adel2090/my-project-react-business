import Joi from "joi-browser";

const validate=(objValidate,schema)=>{
    return Joi.validate(objValidate,schema,{abortEarly:false})
}
export default validate
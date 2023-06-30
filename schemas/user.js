const Joi = require("joi");
const {emailRegexp} = require("../constans/contacts")

const userRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
})

const userLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  token: Joi.string(),
})

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required()
})

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userEmailSchema,
}
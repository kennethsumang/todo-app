import Joi from "joi";
import BaseValidator from "../base.validator";

export default class RegisterValidator extends BaseValidator {
  schema = Joi.object({
    username: Joi
      .string()
      .min(1)
      .required()
      .messages({
        'any.required': 'Missing username.',
        'string.min': 'Missing username.',
        'string.base': 'Invalid username.',
      }),
    password: Joi
      .string()
      .min(1)
      .required()
      .messages({
        'any.required': 'Missing password.',
        'string.min': 'Missing password.',
        'string.base': 'Invalid password.',
      }),
    retypePassword: Joi
      .string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Passwords do not match.',
        'any.required': 'Missing retyped password.',
      }),
  })
}
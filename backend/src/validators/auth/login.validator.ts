import Joi from "joi";
import BaseValidator from "../base.validator";

export default class LoginValidator extends BaseValidator {
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
  })
}
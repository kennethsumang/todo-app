import Joi from "joi";
import BaseValidator from "../base.validator";

export default class LoginValidator extends BaseValidator {
  schema = Joi.object({
    username: Joi.string().min(1).required().messages({
      "any.required": "Username is required.",
      "string.min": "Username is required.",
      "string.base": "Invalid username.",
      "string.empty": "Username is required.",
    }),
    password: Joi.string().min(1).required().messages({
      "any.required": "Password is required.",
      "string.min": "Password is required.",
      "string.base": "Invalid password.",
      "string.empty": "Password is required.",
    }),
  });
}

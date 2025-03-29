import Joi from "joi";
import BaseValidator from "../base.validator";

export default class RegisterValidator extends BaseValidator {
  schema = Joi.object({
    username: Joi.string().min(1).required().messages({
      "any.required": "Username is required.",
      "string.min": "Username is required.",
      "string.base": "Invalid username.",
      "string.empty": "Username is required.",
    }),
    password: Joi.string()
      .min(1)
      .regex(/^[a-zA-Z0-9 !#()_-]+$/)
      .required()
      .messages({
        "any.required": "Password is required.",
        "string.min": "Password is required.",
        "string.base": "Invalid password.",
        "string.pattern.base":
          "Password can only contain letters, numbers, spaces, and the special characters: !, #, (, ), _, -.",
        "string.empty": "Password is required.",
      }),
    retypePassword: Joi.string()
      .required()
      .messages({
        "string.empty": "Retyped Password is required.",
      })
      .custom((value, helpers) => {
        if (value !== helpers.state.ancestors[0].password) {
          return helpers.error("any.only", {
            message: "Passwords do not match.",
          });
        }
        return value;
      }),
  });
}

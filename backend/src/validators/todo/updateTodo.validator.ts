import Joi from "joi";
import BaseValidator from "../base.validator";

export default class UpdateTodoValidator extends BaseValidator {
  schema = Joi.object({
    details: Joi
      .string()
      .max(300)
      .optional()
      .messages({
        'string.max': 'Details must only have a maximum of 300 characters.',
        'string.base': 'Details is invalid.',
      }),
    dueAt: Joi
      .date()
      .optional()
      .messages({
        'date.base': 'DueAt is invalid.',
      }),
    status: Joi
      .number()
      .optional()
      .messages({
        'string.base': 'Status is invalid.',
      }),
  })
}
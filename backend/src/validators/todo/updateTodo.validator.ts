import Joi from "joi";
import BaseValidator from "../base.validator";

export default class UpdateTodoValidator extends BaseValidator {
  schema = Joi.object({
    title: Joi
    .string()
    .max(25)
    .optional()
    .messages({
      'string.max': 'Title must only have a maximum of 25 characters.',
      'string.base': 'Title is invalid.',
    }),
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
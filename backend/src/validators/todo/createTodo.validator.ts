import Joi from "joi";
import BaseValidator from "../base.validator";

export default class CreateTodoValidator extends BaseValidator {
  schema = Joi.object({
    title: Joi
      .string()
      .max(25)
      .required()
      .messages({
        'string.max': 'Title must only have a maximum of 25 characters.',
        'any.required': 'Title is required.',
        'string.base': 'Title is invalid.',
      }),
    details: Joi
      .string()
      .max(300)
      .required()
      .messages({
        'string.max': 'Details must only have a maximum of 300 characters.',
        'any.required': 'Details is required.',
        'string.base': 'Details is invalid.',
      }),
    dueAt: Joi
      .date()
      .required()
      .messages({
        'date.base': 'DueAt is invalid.',
        'any.required': 'DueAt is required.',
      }),
    status: Joi
      .number()
      .min(0)
      .max(3)
      .required()
      .messages({
        'any.required': 'Status is required.',
        'number.base': 'Status is invalid.',
        'number.min': 'Status is invalid.',
        'number.max': 'Status is invalid.',
      }),
    priority: Joi
      .number()
      .min(0)
      .max(3)
      .required()
      .messages({
        'any.required': 'Priority is required.',
        'number.base': 'Priority is invalid.',
        'number.min': 'Priority is invalid.',
        'number.max': 'Priority is invalid.',
      })
  })
}
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
      .string()
      .required()
      .valid('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')
      .messages({
        'any.required': 'Status is required.',
        'string.base': 'Status is invalid.',
        'string.valid': 'Status is invalid.',
      }),
    priority: Joi
      .string()
      .required()
      .valid('LOW', 'HIGH', 'CRITICAL')
      .messages({
        'any.required': 'Priority is required.',
        'string.base': 'Priority is invalid.',
        'string.valid': 'Priority is invalid.',
      })
  })
}
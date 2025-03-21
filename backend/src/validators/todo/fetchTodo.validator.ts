import Joi from "joi";
import BaseValidator from "../base.validator";

export default class FetchTodoValidator extends BaseValidator {
  schema = Joi.object({
    id: Joi
      .string()
      .optional()
      .messages({
        'string.base': 'ID is invalid.',
      }),
    userId: Joi
      .string()
      .optional()
      .messages({
        'string.base': 'userId is invalid.',
      }),
    limit: Joi
      .number()
      .optional()
      .messages({
        'number.base': 'Limit is invalid.',
      }),
    page: Joi
      .number()
      .optional()
      .messages({
        'number.base': 'Page is invalid.',
      }),
    status: Joi
      .number()
      .min(0)
      .max(3)
      .optional()
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
      .optional()
      .messages({
        'any.required': 'Priority is required.',
        'number.base': 'Priority is invalid.',
        'number.min': 'Priority is invalid.',
        'number.max': 'Priority is invalid.',
      }),
    title: Joi
      .string()
      .optional()
      .messages({
        'any.required': 'Title is required.',
        'string.base': 'Title is invalid.',
      }),
    details: Joi
      .string()
      .optional()
      .messages({
        'any.required': 'Details is required.',
        'string.base': 'Details is invalid.',
      }),
  })
}
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
  })
}
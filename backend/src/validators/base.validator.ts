import Joi, { Schema } from "joi";
import BadRequestError from "../exceptions/badRequest.error";
import _ from "lodash";
import { GENERAL_ERROR_CODES } from "../constants/error.constant";

export default class BaseValidator {
  schema: Schema = Joi.object({});

  validate<T>(data: Record<string, any>): T {
    const { error, value } = this.schema.validate(data, { abortEarly: false });
    if (!error) {
      return value as T;
    }

    let joinedErrorMessages = '';
    _.forEach(error.details, (errorData) => {
      joinedErrorMessages += errorData.message + ' ';
    });
    throw new BadRequestError(joinedErrorMessages.trim(), GENERAL_ERROR_CODES.INPUT_VALIDATION_FAILED);
  }
}
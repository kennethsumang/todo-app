import Joi, { Schema } from "joi";
import BadRequestError from "../exceptions/badRequest.error";
import _ from "lodash";

export default class BaseValidator {
  schema: Schema = Joi.object({});

  validate<T>(data: Record<string, any>): T {
    const { error, value } = this.schema.validate(data);
    if (!error) {
      return value as T;
    }

    let joinedErrorMessages = '';
    _.forEach(error.details, (errorData) => {
      joinedErrorMessages += errorData.message + ' ';
    });
    throw new BadRequestError(joinedErrorMessages);
  }
}
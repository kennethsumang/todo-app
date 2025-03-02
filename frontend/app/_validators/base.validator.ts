import Joi, { Schema } from "joi";
import _ from "lodash";

export interface ValidationErrorStruct {
  errors: Joi.ValidationError;
}

export default class BaseValidator {
  schema: Schema = Joi.object({});

  validate<T>(data: Record<string, any>): T | ValidationErrorStruct {
    const { error, value } = this.schema.validate(data, { abortEarly: false });
    if (!error) {
      return value as T;
    }

    return { errors: error };
  }
}

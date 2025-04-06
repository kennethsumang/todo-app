import ApiError from "./api.error";

/**
 * ServerError class
 */
export default class ServerError extends ApiError {
  constructor(message: string, errorCode: string = "") {
    super(message, 500, errorCode);
  }
}
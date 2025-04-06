/**
 * ApiError class
 */
export default class ApiError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(message: string, statusCode: number, errorCode: string = "") {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode || "GENERAL_ERROR";
  }
}
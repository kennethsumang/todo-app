export default class ApiError extends Error {
  code: number = 500;
  errorCode: string = "";

  constructor(message: string, code: number, errorCode: string = "") {
    super(message);
    this.code = code;
    this.errorCode = errorCode || "GENERAL_ERROR";
    console.log(`Error ${code}: ${message} (${this.errorCode})`);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

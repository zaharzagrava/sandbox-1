/**
 * Custom error class
 * @description Should be called when an error happens on backend.
 * Should contain a list of errors (manifested in error codes) that went
 * wrong. Mostly one error code will be enough, but just in case, you can
 * return multiple error coeds, signifying that multiple things have gone wrong
 */
export class Errors extends Error {
  errorCodes;

  constructor(errorCodes: ErrorCodes[]) {
    super();

    this.errorCodes = errorCodes;
  }
}

/**
 * Error codes
 */
export enum ErrorCodes {
  USER_EMAIL_TAKEN = "USER_EMAIL_TAKEN",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

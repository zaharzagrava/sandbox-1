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

  USER_INCORRECT_EMAIL = "USER_INCORRECT_EMAIL",
  USER_INCORRECT_PASSWORD = "USER_INCORRECT_PASSWORD",

  USER_NOT_FOUND = "USER_NOT_FOUND",
  NOTIFICAION_NOT_FOUND = "USER_NOT_FOUND",
  EVENT_NOT_FOUND = "USER_NOT_FOUND",
  DOCUMENT_NOT_FOUND = "USER_NOT_FOUND",

  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export enum KnexErrorType {
  EMAIL_TAKEN = "EMAIL_TAKEN",
}

export const processKnexError = (
  error: any,
  params: { [key in KnexErrorType]: ErrorCodes }
) => {
  // if it is knex-specific error
  if (error.detail && typeof error.detail === "string") {
    const errorDetail = error.detail as string;

    // if it is email taken error
    if (Object.keys(params).includes(KnexErrorType.EMAIL_TAKEN)) {
      if (/.*email.*already exists/g.test(errorDetail)) {
        throw new Errors([params[KnexErrorType.EMAIL_TAKEN]]);
      }
    }
  }
};

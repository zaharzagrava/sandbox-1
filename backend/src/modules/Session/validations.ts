import { Callback } from '../../interfaces';
import Joi from 'joi';

export default class SessionValidator {
  constructor() {}

  private static validateLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
      .min(6)
      .max(255)
      .required(),
  });

  static validateLogin(reqBody: any, callback: Callback<null>): void {
    const response = this.validateLoginSchema.validate(reqBody);

    if (response.error) {
      callback({
        status: 400,
        message: response.error.details
          .map((detail) => detail.message)
          .join(' '),
      });
      return;
    }
    if (response.errors) {
      callback({
        status: 400,
        message: response.errors.details
          .map((detail) => detail.message)
          .join(' '),
      });
      return;
    }

    callback(null, null);
  }

  private static validateVerifySchema = Joi.object({
    accessToken: Joi.string().required(),
  });

  static validateVerify(reqCookies: any, callback: Callback<null>): void {
    const response = this.validateVerifySchema.validate(reqCookies);

    if (response.error) {
      callback({
        status: 400,
        message: response.error.details
          .map((detail) => detail.message)
          .join(' '),
      });
      return;
    }
    if (response.errors) {
      callback({
        status: 400,
        message: response.errors.details
          .map((detail) => detail.message)
          .join(' '),
      });
      return;
    }

    callback(null, null);
  }
}

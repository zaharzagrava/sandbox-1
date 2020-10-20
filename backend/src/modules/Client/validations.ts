import { request, Request } from 'express';
import { nextTick } from 'process';
import { Callback } from 'src/interfaces';
import { ClientDTO } from '../../interfaces/';
import Joi from 'joi';

export default class ClientValidator {
  constructor() {}

  private static validateCreateSchema = Joi.object({
    username: Joi.string().alphanum().min(1).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
      .min(6)
      .max(255)
      .required(),
  });

  static validateCreate(reqBody: any, callback: Callback<null>): void {
    const response = this.validateCreateSchema.validate(reqBody);

    if (response.error !== undefined) {
      callback({
        status: 400,
        message: response.error.details
          .map((detail) => detail.message)
          .join(' '),
      });
    } else if (response.errors !== undefined) {
      callback({
        status: 400,
        message: response.errors.details
          .map((detail) => detail.message)
          .join(' '),
      });
    } else {
      callback(null, null);
    }
  }
}

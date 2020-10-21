import { Callback } from '../../interfaces';
import Joi from 'joi';

export default class ClientValidator {
  constructor() {}

  private static validateGetDeleteUpdateSchemaParams = Joi.object({
    id: Joi.number().required(),
  });

  static validateGetDelete(reqParams: any, callback: Callback<null>): void {
    const response = this.validateGetDeleteUpdateSchemaParams.validate(
      reqParams
    );

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

    if (response.error) {
      callback({
        status: 400,
        message: response.error.details
          .map((detail) => detail.message)
          .join(' '),
      });
    } else if (response.errors) {
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

  private static validateUpdateSchema = Joi.object({
    username: Joi.string().alphanum().min(1).max(30).required(),
    email: Joi.string().email().min(1).max(255).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
      .min(6)
      .max(255)
      .required(),
    full_name: Joi.string().min(1).max(255).required(),
    website: Joi.string().min(1).max(255).required(),
    bio: Joi.string().min(1).max(150).required(),
    avatar: Joi.string().min(1).max(255).required(),
    phone_number: Joi.string().min(1).max(255).email().required(),
    gender: Joi.string().min(1).max(255).required(),
  });

  static validateUpdate(
    reqParams: any,
    reqBody: any,
    callback: Callback<null>
  ): void {
    let response = this.validateGetDeleteUpdateSchemaParams.validate(reqParams);

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

    response = this.validateUpdateSchema.validate(reqBody);

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

import { Callback } from '../../interfaces';
import Joi from 'joi';

export default class ClientValidator {
  constructor() {}

  private static validateGetDeleteUpdateSchemaParams = Joi.object({
    id: Joi.number().required(),
  });

  static validateGet(reqParams: any, callback: Callback<null>): void {
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
    full_name: Joi.string().min(1).max(255),
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
    username: Joi.string().alphanum().min(1).max(30),
    email: Joi.string().email().min(1).max(255),
    full_name: Joi.string().min(1).max(255),
    website: Joi.string().min(1).max(255),
    bio: Joi.string().min(1).max(150),
    phone_number: Joi.string().min(1).max(255).email(),
    gender: Joi.string().min(1).max(255),
    avatar: Joi.string().min(1).max(255),
  });

  static validateUpdate(reqBody: any, callback: Callback<null>): void {
    const response = this.validateUpdateSchema.validate(reqBody);

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

  private static validateUpdatePasswordSchema = Joi.object({
    old_password: Joi.string().min(1).max(255),
    new_password: Joi.string().min(1).max(255),
  });

  static validateUpdatePassword(reqBody: any, callback: Callback<null>): void {
    const response = this.validateUpdatePasswordSchema.validate(reqBody);

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

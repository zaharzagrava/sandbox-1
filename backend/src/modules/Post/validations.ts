import { Callback } from '../../interfaces';
import Joi from 'joi';

export default class PostValidator {
  constructor() { }

  private static validateGetAllSchemaParams = Joi.object({
    client_id: Joi.number(),
  });

  static validateGetAll(reqParams: any, callback: Callback<null>): void {
    const response = this.validateGetAllSchemaParams.validate(reqParams);

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
    full_text: Joi.string().min(0).max(2200),
    multimedia: Joi.array().items(Joi.string().min(1).max(255)).required(),
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
    full_text: Joi.string().min(0).max(2200),
    multimedia: Joi.array().items(Joi.string().min(1).max(255)),
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

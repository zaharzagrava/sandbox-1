import { Callback } from '../../interfaces';
import Joi from 'joi';

export default class CommentValidator {
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

  private static validateUpdateCreateSchema = Joi.object({
    full_text: Joi.string().min(0).max(300).required(),
  });

  private static validateCreateParamsSchema = Joi.object({
    post_id: Joi.number().required(),
  });

  static validateCreate(
    reqBody: any,
    reqQueryParams: any,
    callback: Callback<null>
  ): void {
    let response = this.validateUpdateCreateSchema.validate(reqBody);

    if (response.error) {
      callback({
        status: 400,
        message: response.error.details
          .map((detail) => detail.message)
          .join(' '),
      });
      return;
    } else if (response.errors) {
      callback({
        status: 400,
        message: response.errors.details
          .map((detail) => detail.message)
          .join(' '),
      });
      return;
    }

    response = this.validateCreateParamsSchema.validate(reqQueryParams);

    if (response.error) {
      callback({
        status: 400,
        message: response.error.details
          .map((detail) => detail.message)
          .join(' '),
      });
      return;
    } else if (response.errors) {
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

    response = this.validateUpdateCreateSchema.validate(reqBody);

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

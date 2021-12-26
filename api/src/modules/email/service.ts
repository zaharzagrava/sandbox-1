import {
  SESv2Client,
  SendEmailCommand,
  SendEmailCommandOutput,
} from "@aws-sdk/client-sesv2";
import { v4 } from "uuid";
import { redis } from "../../redis";
import constants from "../../constants";

const sesV2Client = new SESv2Client({
  region: constants.AWS_REGION,
  credentials: {
    accessKeyId: constants.AWS_ACCESS_KEY_ID,
    secretAccessKey: constants.AWS_SECRET_ACCESS_KEY,
  },
});

export class EmailService {
  static confirmationPrefix = "confirmation:";

  static restorePasswordPrefix = "restorePassword:";

  static async sendEmail({
    subject,
    body,
    to,
  }: {
    subject: string;
    body: string;
    to: string;
  }): Promise<SendEmailCommandOutput> {
    return sesV2Client.send(
      new SendEmailCommand({
        Content: {
          Simple: {
            Subject: {
              Data: subject,
            },
            Body: {
              Html: {
                Data: body,
              },
            },
          },
        },
        Destination: {
          ToAddresses: [constants.AWS_SES_FROM_EMAIL],
        },
        FromEmailAddress: constants.AWS_SES_FROM_EMAIL,
      })
    );
  }

  static async sendConfirmationEmail({
    userId,
  }: {
    userId: string;
  }): Promise<SendEmailCommandOutput> {
    const token = v4();
    redis.set(
      `${this.confirmationPrefix}${token}`,
      userId,
      "ex",
      60 * 60 * 24 * 1
    ); // 1 day expiration

    return this.sendEmail({
      subject: "Confirmation Email",
      body: `Please, confirm your email by using this token: ${token}`,
      to: "zaharzagrava@gmail.com",
    });
  }
}

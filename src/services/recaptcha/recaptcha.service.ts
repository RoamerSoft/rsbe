import { Injectable } from '@nestjs/common';
import { RecaptchaResponse } from 'src/models/recaptcha-response/recaptcha-response';

@Injectable()
export class RecaptchaService {
  // Using request instead of HttpService because Google didn't receives the data.
  private request = require('request');
  private secret = process.env.RECAPTCHA_SECRET;

  public checkToken(token): Promise<RecaptchaResponse> {
    return new Promise<RecaptchaResponse>(resolve => {
      const options = {
        method: 'POST',
        url: 'https://www.google.com/recaptcha/api/siteverify',
        headers: {},
        formData: {
          secret: this.secret,
          response: token,
        },
      };
      this.request(options, (error, response) => {
        const recaptchaResponse = JSON.parse(
          response.body,
        ) as RecaptchaResponse;
        resolve(recaptchaResponse);
      });
    });
  }
}

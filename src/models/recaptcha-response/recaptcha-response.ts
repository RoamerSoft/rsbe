export class RecaptchaResponse {
  public success: boolean;
  public challenge_ts: string;
  public hostname: string;
  public score: any;
  public action: string;
}

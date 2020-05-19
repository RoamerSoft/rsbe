import { Controller, Post, Body } from '@nestjs/common';
import { ContactForm } from 'src/models/contact-form/contact-form';
import { RecaptchaService } from 'src/services/recaptcha/recaptcha.service';
import { MailService } from 'src/services/mail/mail.service';
import { Mail } from 'src/models/mail/mail';

@Controller('contact')
export class ContactController {
  constructor(
    private recaptchaService: RecaptchaService,
    private mailService: MailService,
  ) {}

  @Post()
  contactForm(@Body() contactForm: ContactForm) {
    // check reCAPTCHA token
    this.recaptchaService.checkToken(contactForm.token).then(async res => {
      // Check if spam score is higher then 5
      if (res.score > 0.5) {
        // Create the email
        const mail = new Mail();
        mail.from = '"RoamerSoft.com" <noreply@roamersoft.com>';
        mail.from = `"${contactForm.name}" <${contactForm.email}>`;
        mail.to = '"RoamerSoft" <info@roamersoft.com>';
        mail.subject = 'Contact Form Message';
        mail.text = `${contactForm.message}`;

        // Send the email
        this.mailService.sendMail(mail);
        return;
      }
    });
    return;
  }
}

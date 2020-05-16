import { Controller, Post, Body } from '@nestjs/common';
import { ContactForm } from 'src/models/contact-form/contact-form';
import { RecaptchaService } from 'src/services/recaptcha/recaptcha.service';

@Controller('contact')
export class ContactController {
  constructor(private recaptchaService: RecaptchaService) {}

  @Post()
  contactForm(@Body() contactForm: ContactForm) {
    this.recaptchaService.checkToken(contactForm.token).then(res => {
      if (res.score > 0.5) {
        
      }
      console.log(res.score > 0.5);
    });
  }
}

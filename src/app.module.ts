import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationsModule } from './modules/translations/translations.module';
import { ContactController } from './controllers/contact/contact.controller';
import { RecaptchaService } from './services/recaptcha/recaptcha.service';

@Module({
  imports:  [
    TypeOrmModule.forRoot(),
    TranslationsModule,
    HttpModule
  ],
  controllers: [AppController, ContactController],
  providers: [AppService, RecaptchaService],
})
export class AppModule {}

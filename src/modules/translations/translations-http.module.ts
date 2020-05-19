import { Module } from '@nestjs/common';
import { TranslationsModule } from './translations.module';
import { TranslationsService } from '../../services/translations/translations.service';
import { TranslationsController } from 'src/controllers/translations/translations.controller';

@Module({
  imports: [TranslationsModule],
  providers: [TranslationsService],
  controllers: [TranslationsController]
})
export class TranslationsHttpModule {}

import { Controller, Get } from '@nestjs/common';
import { TranslationsService } from 'src/services/translations/translations.service';

@Controller('translations')
export class TranslationsController {
  constructor(private translationsService: TranslationsService) {}

  @Get()
  async findAll() {
    return this.translationsService.getTranslations().then(res => {
      return res
    });
  }

  @Get('add')
  async addTranslations() {
    return await this.translationsService.addTranslations();
  }
}

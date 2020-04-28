import { Controller, Get, Param } from '@nestjs/common';
import { TranslationsService } from 'src/services/translations/translations.service';
import { Translation } from 'src/entities/translation.entity';

@Controller('translations')
export class TranslationsController {
  constructor(private translationsService: TranslationsService) {}

  @Get()
  async findAll() {
    return this.translationsService.getTranslations().then(res => {
      return res;
    });
  }

  @Get(':lang')
  async findOne(@Param() params) {
    return this.translationsService
      .getTranslationByLanguage(params.lang)
      .then((res: Translation) => {
        return res.content;
      });
  }

  @Get('add')
  async addTranslations() {
    return await this.translationsService.addTranslations();
  }
}

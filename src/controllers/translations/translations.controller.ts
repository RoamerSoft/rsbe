import { Controller, Get, Param } from '@nestjs/common';
import { TranslationsService } from 'src/services/translations/translations.service';
import { Translation } from 'src/entities/translation.entity';

@Controller('translations')
export class TranslationsController {
  constructor(private translationsService: TranslationsService) {}

  @Get(':lang')
  async findOne(@Param() params) {
    return this.translationsService
      .getTranslationByLanguage(params.lang)
      .then((res: Translation) => {
        return res.content;
      });
  }
}

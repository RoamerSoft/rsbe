import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Translation } from 'src/entities/translation.entity';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectRepository(Translation)
    private translationsRepository: Repository<Translation>,
    private connection: Connection,
  ) {}

  public async getTranslations() {
    return await this.connection.transaction(async manager => {
      return await manager.find(Translation);
    });
  }

  public async getTranslationByLanguage(lang: string) {
    return await this.connection.transaction(async manager => {
      return await manager.findOne(Translation, { where: { language: lang } });
    });
  }

  public async addTranslations() {
    const nl = new Translation();
    nl.language = 'nl';
    nl.content = {
      HELLO: 'Hallo {{value}}',
      'Welcome to': 'Welkom bij',
      'Here are some links to help you start':
        'Hier zijn wat links om je op weg te helpen.',
    };

    const en = new Translation();
    en.language = 'en';
    en.content = {
      HELLO: 'hello {{value}}',
      'Welcome to': 'Welcome to',
      'Here are some links to help you start':
        'Here are some links to help you start',
    };
    return await this.connection.transaction(async manager => {
      await manager.save(nl);
      await manager.save(en);
      return await manager.find(Translation);
    });
  }
}

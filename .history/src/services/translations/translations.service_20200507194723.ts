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
      "RoamerSoft | Web and App Development": "RoamerSoft | Web and App Development",
      "Mobile App Development for Android and Apple iOS. Advanced Web Applications, WordPress Websites and Web Shops. Remotely build by a Full-Stack Software Developer.": "Mobile App Development for Android and iOS. Advanced Web Applications, WordPress Websites and Web Shops. Remotely build by a Full-Stack Software Developer.",
      "RoamerSoft, Bas Gerritsen, App Development, Web Development, WordPress Development, Websites, Web Shop, Remote, Full-Stack, Software, Developer": "RoamerSoft, Bas Gerritsen, App Development, Web Development, WordPress Development, Websites, Web Shop, Remote, Full-Stack, Software, Developer",
      "Web and App Development": "Web and App Development",
      "Mobile App Development": "Mobile App Development",
      "Web Application Development": "Web Application Development",
      "WordPress Development": "WordPress Development",
      "EXPLORE MORE": "EXPLORE MORE",
      "Custom Software for Every Device": "Custom Software for Every Device",
      "Do you need a Mobile App which runs on both Android and Apple iOS? Or do you need an application to improve your business process efficiency? Or maybe a Website or Web Shop to get your name out and raise sales?": "Do you need a Mobile App which runs on both Android and Apple iOS? Or do you need an application to improve your business process efficiency? Or maybe a Website or Web Shop to get your name out and raise sales?",
      "Whether it is a Mobile App, an advanced web application, a website or Web shop. I create the application which suits your needs, an application of the highest quality and which runs smoothly and exactly the same on all devices.": "Whether it is a Mobile App, an advanced web application, a website or Web shop. I create the application which suits your needs, an application of the highest quality and which runs smoothly and exactly the same on all devices.",
      "More about my services": "More about my services"
    }
    ;
    return await this.connection.transaction(async manager => {
      await manager.save(nl);
      await manager.save(en);
      return await manager.find(Translation);
    });
  }
}

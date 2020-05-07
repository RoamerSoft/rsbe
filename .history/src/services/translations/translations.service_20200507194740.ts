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
      "RoamerSoft | Web and App Development": "RoamerSoft | Web en App Ontwikkeling",
      "Mobile App Development for Android and Apple iOS. Advanced Web Applications, WordPress Websites and Web Shops. Remotely build by a Full-Stack Software Developer.": "Mobiele app ontwikkeling voor Android en Apple iOS. Geavanceerde webapplicaties, wordPress websites en webshops. Remote gebouwd door een full stack software ontwikkelaar.",
      "RoamerSoft, Bas Gerritsen, App Development, Web Development, WordPress Development, Websites, Web Shop, Remote, Full-Stack, Software, Developer": "RoamerSoft, Bas Gerritsen, App ontwikkeling, Web ontwikkeling, WordPress ontwikkeling, Websites, Web Shop, Remote, Full-Stack, Software, Ontwikkelaar",
      "Web and App Development": "Web en App Ontwikkeling",
      "Mobile App Development": "Mobiele App Ontwikkeling",
      "Web Application Development": "Web Appplicatie Ontwikkeling",
      "WordPress Development": "WordPress Ontwikkeling",
      "EXPLORE MORE": "ONTDEK MEER",
      "Custom Software for Every Device": "Op maat gemaakte software voor elk apparaat",
      "Do you need a Mobile App which runs on both Android and Apple iOS? Or do you need an application to improve your business process efficiency? Or maybe a Website or Web Shop to get your name out and raise sales?": "Heeft u een mobile app nodig die zowel op Android als Apple iOS draait? Of bent u opzoek naar die applicatie die de efficiëntie van uw bedrijfsprocessen bevordert.  Of misschien een website of webshop om uw naamsbekendheid te vergroten en verkopen te stimuleren?",
      "Whether it is a Mobile App, an advanced web application, a website or Web shop. I create the application which suits your needs, an application of the highest quality and which runs smoothly and exactly the same on all devices.": "Of het nu gaat om een mobiele app, een geavanceerde webapplicatie, een website of webshop. Ik maak de applicatie welke past bij uw te behalen doel. Een applicatie van de hoogste kwaliteit welke te gebruiken is op alle apparaten.",
      "More about my services": "Meer over mijn diensten"
    }
  ;

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

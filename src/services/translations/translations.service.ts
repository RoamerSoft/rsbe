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
  
  public async getTranslationByLanguage(lang: string) {
    return await this.connection.transaction(async manager => {
      const trans = await manager.findOne(Translation, {
        where: { language: lang },
      });

      if (trans === undefined) {
        await this.addTranslations();
        return await manager.findOne(Translation, {
          where: { language: lang },
        });
      } else {
        return trans;
      }
    });
  }

  private async addTranslations() {
    const nl = new Translation();
    nl.language = 'nl';
    nl.content = {
      "About": "Over",
      "Services": "Diensten",
      "Web Development": "Web Ontwikkeling",
      "App Development": "App Ontwikkeling",
      "Mission": "Missie",
      "Client Promise": "Klantbelofte",
      "WordPress Deals": "WordPress Deals",
      "Working Method": "Werkwijze",
      "Clients": "Klanten",
      "My Dream": "Mijn Droom",
      "Resume": "CV",
      "RoamerSoft | Web and App Development": "RoamerSoft | Web en App Ontwikkeling",
      "Mobile App Development for Android and Apple iOS. Advanced Web Applications, WordPress Websites and Web Shops. Remotely build by a Full-Stack Software Developer.": "Mobiele app ontwikkeling voor Android en Apple iOS. Geavanceerde webapplicaties, wordPress websites en webshops. Remote gebouwd door een full stack software ontwikkelaar.",
      "RoamerSoft, Bas Gerritsen, App Development, Web Development, WordPress Development, Websites, Web Shop, Remote, Full-Stack, Software, Developer": "RoamerSoft, Bas Gerritsen, App ontwikkeling, Web ontwikkeling, WordPress ontwikkeling, Websites, Web Shop, Remote, Full-Stack, Software, Ontwikkelaar",
      "Web and App Development": "Web en App Ontwikkeling",
      "Mobile App Development": "Mobiele App Ontwikkeling",
      "Web Application Development": "Web Appplicatie Ontwikkeling",
      "WordPress Development": "WordPress Ontwikkeling",
      "EXPLORE MORE": "ONTDEK MEER",
      "Custom made": "Op maat gemaakte",
      "Software for Every Device": "Software voor elk apparaat",
      "Do you need a Mobile App which runs on both Android and Apple iOS? Or do you need an application to improve your business process efficiency? Or maybe a Website or Web Shop to get your name out and raise sales?": "Heeft u een mobile app nodig die zowel op Android als Apple iOS draait? Of bent u opzoek naar die applicatie die de efficiëntie van uw bedrijfsprocessen bevordert.  Of misschien een website of webshop om uw naamsbekendheid te vergroten en verkopen te stimuleren?",
      "Whether it is a Mobile App, an advanced web application, a website or Web shop. I create the application which suits your needs, an application of the highest quality and which runs smoothly and exactly the same on all devices.": "Of het nu gaat om een mobiele app, een geavanceerde webapplicatie, een website of webshop. Ik maak de applicatie welke past bij uw te behalen doel. Een applicatie van de hoogste kwaliteit welke te gebruiken is op alle apparaten.",
      "More about my services": "Meer over mijn diensten",
      "Your own reservation system, inventory management system, customer system or whatever system you need. I build your custom web application which perfectly supports your processes. Platform independent, no installation needed and with the fastest response time.": "Uw eigen reserveringsysteem, voorraadbeheersysteem, klantensysteem of wat voor systeem dan ook. Ik bouw uw maatwerk webapplicatie welke perfect is afgestemd op uw processen. Platform onafhankelijk, geen installatie nodig en met de snelste reactietijd.",
      "Need an app with support for mobile phone, tablets and pc? Do you need it to be available on the Apple App Store as well as on the Google Play Store? I create your cross-platform app which runs on every device and I make it available for download in the both app stores.": "Een app nodig met ondersteuning voor mobiel, tablets en pc? Beschikbaar in zowel de Apple App Store als de Google Play Store? Met de nieuwste technieken bouw ik uw cross-platform app die draait op alle apparaten en ik maak hem downloadbaar in beide app stores.",
      "Searching for a good Website or Web Shop for a fixed and competitive price? The WordPress Deals gives you the total solution. A Website or Web shop, created completely to your liking. Including hosting, custom domain name, email, SEO, maintenance and backups for an all-in-one price.": "Een goede website of webshop nodig voor een vaste scherpe prijs? De WordPress Deals bieden u de totaaloplossing. Een compleet naar wens ingerichte website of webshop inclusief hosting, eigen domeinnnaam, e-mail, SEO, onderhoud en back-ups voor een all-in-one prijs.",
      "Why choose": "Waarom kiezen voor",
      "RoamerSoft stands for freedom; the freedom to follow dreams. I create possibilities with the newest technologies, possibilities to realize dreams.": "RoamerSoft staat voor vrijheid, vrijheid om dromen te volgen. Met de nieuwste technieken creëer ik mogelijkheden, mogelijkheden om dromen te verwezenlijken.",
      "Creating such possibilities is not going to work by just working on a list of requirements and handing over the result. No, it requires me to really understand your dream. What is it what you want to accomplish? What is the end goal? Which possibilities can we use and which techniques fits the best to realize it?": "Het creëren van zulke mogelijkheden lukt niet door een lijstje met eisen weg te werken in een applicatie, om dit vervolgens over de schutting te gooien. Nee, dit vraagt om verdieping in uw droom. Wat is het streven? Wat is uw einddoel? Welke mogelijkheden zijn hiervoor nodig en welke technieken sluiten hier het beste op aan? Ik wil u niet een product verkopen, maar een mogelijkheid creëren voor het realiseren van uw droom.",
      "So, why RoamerSoft? You choose to work with me if you want to follow your dreams, just like myself. Dreams can be big or small. A simple website to get your name out into the open or that mobile app which will change the world. I can create the possibilities for you to follow your dreams.": "Dus, waarom RoamerSoft? U kiest voor mij als u, net als ikzelf, uw dromen wilt volgen. Dromen kunnen groot of klein zijn. Een simpele website om uw naamsbekendheid te vergroten of die mobiele app die de wereld zal veranderen. Ik kan de mogelijkheden voor u creëren om uw dromen te bereiken.",
      "My dream can be found at the bottom of this page. What is your dream?": "Mijn droom vindt u onderaan. Wat is die van u?",
      "Checkout My Dream": "Bekijk mijn droom",
      "The promise that I make to all my clients is that I deliver high quality products and services which are giving real value to the client’s main goal and that it makes no difference for whether the way of working or the results if I work remotely or on a specific location.": "De belofte die ik mijn klanten maak is dat ik kwalitatief hoge producten en diensten lever die echte waarde toevoegen aan het te bereiken einddoel van mijn klant en waarin het geen verschil maakt in zowel de uitwerking als het resultaat of ik mijn werk remote of op een specifieke locatie uitoefen.",
      "Checkout My Working Method": "Bekijk mijn werkwijze",
      "About my": "Over mijn",
      "Everything starts with a first introduction. Online, by using a video call. I travel a lot and I am staying all over the world and because of that I work only remote. With the use of the video call we can get to know each other a bit better. This is essential because it is important for me to understand what you precisely trying to accomplish. The next step is to figure out which possibilities we can use and which technique fits the best.": "Alles begint met een eerst kennismaking. Online, via een video call. Ik werk namelijk alleen remote, doordat ik veel reis en op alle uithoeken van de wereld kom. In de call leren we elkaar beter kennen en om u het beste van dienst te zijn is het belangrijk dat ik begrijp wat u precies wilt bereiken. Vervolgens kijken we welke mogelijkheden we hiervoor kunnen gebruiken en welke technieken hier het beste op aansluiten.",
      "We start working right away after we have figured out the plan in guidelines. We? Yes, you and me. Software development is teamwork and it is very unpredictable how the plans will work out. We cut the big project into smaller pieces and I start developing those with the highest value and priority first. I will create those pieces in short cycles of 2 weeks and we discuss the results and any improvements afterwards. After that, we can set the new priority for the next two weeks. We keep doing this cycle until the product has become the possibility which get you a step closer to your main goal.": "Als wij eenmaal het pad in grote lijnen hebben uitgezet, gaan we zo snel mogelijk aan de slag. Wij? Jep, u en ik. Softwareontwikkeling is teamwork en het verloop is heel onvoorspelbaar. Samen hakken we het hele plan in kleine haalbare stukjes, waarvan ik die met de meeste waarde en prioriteit realiseer in een korte cyclus van twee weken. Na deze twee weken bespreken we het resultaat, eventuele verbeteringen en bepalen we de prioriteit voor de volgende twee weken. Net zo lang totdat het product daadwerkelijk die mogelijkheid is geworden die u een stap dichter bij uw einddoel brengt.",
      "I will make sure, with the right preparation and a clear structure, that our contact moments are fast and smooth. There is no need to spend hours of your time when it is not adding the highest possible value to the result.": "Vanzelfsprekend zorg ik ervoor dat deze contactmomenten snel en soepel verlopen, het is natuurlijk niet de bedoeling dat uw tijd onnodig wordt verspild. Door de juiste voorbereiding en een duidelijke structuur, zorg ik ervoor dat er in het kortste tijdsbestek een zo hoog mogelijke toegevoegde waarde wordt gecreëerd.",
      "Do you want to know more about my working method or do you have any other question? Please, feel free to contact me. I would be happy help.": "Meer weten over mijn werkwijze of een andere vraag? Neem gerust contact op, ik kijk graag wat ik voor u kan betekenen.",
      "Contact Me": "Neem contact op",
      "Portfolio": "Portfolio",
      "en.html": "nl.html",
      "StoryTemple Interaction App": "StoryTemple Interactie App",
      "Help Me Remind App": "Help Me Herinneren App",
      "IT-Toolkit Web Application": "IT-Toolkit Webapplicatie",
      "Software Developer": "Software Ontwikkelaar",
      "Please feel free to contact me.": "Neem gerust contact met mij op.",
      "About My": "Over mijn",
      "Dream": "Droom",
      "Quite cold! Is what I say out loud while I am standing in the water to my hips. Come on Bas! You are standing here for ages, is what I am telling myself. What should those people think of me? 1, 2, 3… Splash! I dive into the water and take a couple of strokes. A feeling of freedom and happiness is rushing through my veins. I swim to the surface with a big smile on my face. I take in my famous sea star position and start floating on the salty sea. I hate my life, is what I am saying laughing loudly.": "Best fris! zeg ik hardop, wanneer ik tot net onder mijn heup in het water sta. Kom op Bas! Lang genoeg getreuzeld, denk ik bij mezelf. Wat moeten die mensen wel niet denken? 1, 2, 3…. Plons! Ik neem een diepe duik en doe een paar slagen onder water. Een gevoel van bevrijding en geluk raast door mijn lichaam. Met een grote glimlach kom ik weer boven water. Ik neem mijn goed beoefende zeesterhouding aan en drijf op de zoute zee. Wat een rotleven, zeg ik lachend.",
      "My thoughts bring me back to the last 6 months. I have been working so hard on that mobile application for my client who lives in the Netherlands. I spent all my time and passion in this project, working fully remote from my apartment in Sydney, Australia. My client is happy as hell, the last invoice is paid and I am totally ready for the next adventure. Backpacking! This time I am going to New Zealand for 3 months and 3 months to the USA afterwards. I will end up in New York eventually and start working for 6 months again. I am going to be working on my own application this time which is standing in the top 10 of both the Apple App Store and the Google Play Store.": "Ik denk terug aan hoe hard ik de afgelopen zes maanden heb gewerkt aan die applicatie voor mijn klant in Nederland, volledig op afstand. Al mijn tijd en passie heb ik er ingestopt vanuit mijn appartement in Sydney, Australië. Mijn klant is super tevreden, de laatste factuur is betaald en ik ben weer helemaal klaar voor het avontuur. Backpacken! Dit keer drie maanden New Zeeland en daarna nog drie maanden in de USA. Uiteindelijk eindig ik dan ik New York. Hier ga ik zes maanden verder werken aan mijn eigen applicatie, die in zowel de Apple App Store als in Google Play Store in de top 10 staat.",
      "Happily, I swim back to the beach. I see my friends standing ready with a couple of ice-cold beers. Yeah, this is my life. My life being a ‘Digital Nomad’!": "Dolgelukkig zwem ik terug naar het strand, waar mijn vrienden al klaar staan met ijskoud bier. Ja, dit is mijn leven. Mijn leven als ‘Digital Nomad’!",
      "The dream standing above developed through the years until what it is now. It went fast especially while I was studying. I learned what is really important in life and that there is no need to do what everybody else is doing. I learned which possibilities there are to accomplish my dream and after my study it was time to go for it.": "De bovenstaande droom is door de jaren heen ontwikkeld tot wat het nu is, vooral tijdens mijn studie ging het hard. Hier leerde ik wat er echt telt in het leven en dat je niet hoeft te doen wat iedereen doet. Ik leerde welke mogelijkheden er zijn om dit te bereiken en na mijn studie was het zover.",
      "I have chosen to combine my 2 biggest passions. Software development and traveling. Making applications with the newest technologies and creating possibilities for my clients with it. Making a difference in an organization with my technical solutions. Doing this while traveling, without having a final destination. Making the world my home, living as a": "Ik koos ervoor mijn twee grootste passies uit te voeren: softwareontwikkeling en reizen. Met de nieuwste technieken applicaties maken, die mogelijkheden creëren voor mijn klanten. Een verschil maken in een organisatie met mijn technische oplossingen. Dit, dit terwijl ik de wereld over reis, zonder het hebben van een definitieve eindbestemming. De wereld mijn thuis maken, leven als een",
      "Someone who likes to move around and travel, especially without a clear idea of what they want to do.": "Iemand die het prettig vindt om over de wereld te reizen, zonder een duidelijk idee van wat hij wil doen.",
      "With this thought, RoamerSoft was born!": "RoamerSoft was hiermee een feit!",
      "Nowadays, I am proud to tell that I have helped multiple of my clients to mobile apps, advanced web applications, web shops and websites. Besides, I have seen a big part of Southeast Asia. I guess this is a nice start, right?": "Inmiddels, heb ik meerdere klanten geholpen aan onder andere mobiele apps, geavanceerde webapplicaties, webshops, websites en heb ik een groot deel van Zuidoost-Azië gezien. Toch een leuk begin?",
      "RoamerSoft.com © 2020 All Rights Reserved.": "RoamerSoft.com © {{year}} Alle rechten voorbehouden.",
      "Working Worldwide Remotely": "Wereldwijd werkend op afstand",
      "Privacy Disclaimer": "Privacyverklaring",
      "Terms and Conditions": "Algemene voorwaarden",
      "VAT ID:": "Btw-id:",
      "Chamber of Commerce No.:": "KVK-nummer:",
      "Enter your Name": "Uw naam",
      "Enter your Email": "Uw e-mailadres",
      "Enter your Message": "Uw bericht",
      "Send message": "Vertuur bericht",
      "This website uses cookies to ensure you get the best experience.": "Deze website gebruikt cookies om zeker te stellen dat u de beste ervaring krijgt.",
      "More info": "Meer info",
      "Got it!": "Snap ik!",
      "Your message is sent!": "Uw bericht is verzonden!",
      "Email address is incorrect!": "Het e-mailadres is incorrect!"
    };    

    const en = new Translation();
    en.language = 'en';
    en.content = {
      "About": "About",
      "Services": "Services",
      "Web Development": "Web Development",
      "App Development": "App Development",
      "Mission": "Mission",
      "Client Promise": "Client Promise",
      "WordPress Deals": "WordPress Deals",
      "Working Method": "Working Method",
      "Clients": "Clients",
      "My Dream": "My Dream",
      "Resume": "Resume",
      "RoamerSoft | Web and App Development": "RoamerSoft | Web and App Development",
      "Mobile App Development for Android and Apple iOS. Advanced Web Applications, WordPress Websites and Web Shops. Remotely build by a Full-Stack Software Developer.": "Mobile App Development for Android and iOS. Advanced Web Applications, WordPress Websites and Web Shops. Remotely build by a Full-Stack Software Developer.",
      "RoamerSoft, Bas Gerritsen, App Development, Web Development, WordPress Development, Websites, Web Shop, Remote, Full-Stack, Software, Developer": "RoamerSoft, Bas Gerritsen, App Development, Web Development, WordPress Development, Websites, Web Shop, Remote, Full-Stack, Software, Developer",
      "Web and App Development": "Web and App Development",
      "Mobile App Development": "Mobile App Development",
      "Web Application Development": "Web Application Development",
      "WordPress Development": "WordPress Development",
      "EXPLORE MORE": "EXPLORE MORE",
      "Custom made": "Custom made",
      "Software for Every Device": "Software for Every Device",
      "More about my services": "More about my services",
      "Do you need a Mobile App which runs on both Android and Apple iOS? Or do you need an application to improve your business process efficiency? Or maybe a Website or Web Shop to get your name out and raise sales?": "Do you need a Mobile App which runs on both Android and Apple iOS? Or do you need an application to improve your business process efficiency? Or maybe a Website or Web Shop to get your name out and raise sales?",
      "Whether it is a Mobile App, an advanced web application, a website or Web shop. I create the application which suits your needs, an application of the highest quality and which runs smoothly and exactly the same on all devices.": "Whether it is a Mobile App, an advanced web application, a website or Web shop. I create the application which suits your needs, an application of the highest quality and which runs smoothly and exactly the same on all devices.",
      "Your own reservation system, inventory management system, customer system or whatever system you need. I build your custom web application which perfectly supports your processes. Platform independent, no installation needed and with the fastest response time.": "Your own reservation system, inventory management system, customer system or whatever system you need. I build your custom web application which perfectly supports your processes. Platform independent, no installation needed and with the fastest response time.",
      "Need an app with support for mobile phone, tablets and pc? Do you need it to be available on the Apple App Store as well as on the Google Play Store? I create your cross-platform app which runs on every device and I make it available for download in the both app stores.": "Need an app with support for mobile phone, tablets and pc? Do you need it to be available on the Apple App Store as well as on the Google Play Store? I create your cross-platform app which runs on every device and I make it available for download in the both app stores.",
      "Searching for a good Website or Web Shop for a fixed and competitive price? The WordPress Deals gives you the total solution. A Website or Web shop, created completely to your liking. Including hosting, custom domain name, email, SEO, maintenance and backups for an all-in-one price.": "Need a good Website or Web Shop for a fixed and competitive price? The WordPress Deals gives you the total solution. A Website or Web shop, created completely to your liking. Including hosting, custom domain name, email, SEO, maintenance and backups for an all-in-one price.",
      "Why choose": "Why choose",
      "RoamerSoft stands for freedom; the freedom to follow dreams. I create possibilities with the newest technologies, possibilities to realize dreams.": "RoamerSoft stands for freedom; the freedom to follow dreams. I create possibilities with the newest technologies, possibilities to realize dreams.",
      "Creating such possibilities is not going to work by just working on a list of requirements and handing over the result. No, it requires me to really understand your dream. What is it what you want to accomplish? What is the end goal? Which possibilities can we use and which techniques fits the best to realize it?": "Creating such possibilities is not going to work by just working on a list of requirements and handing over the result. No, it requires me to really understand your dream. What is it what you want to accomplish? What is the end goal? Which possibilities can we use and which techniques fits the best to realize it?",
      "So, why RoamerSoft? You choose to work with me if you want to follow your dreams, just like myself. Dreams can be big or small. A simple website to get your name out into the open or that mobile app which will change the world. I can create the possibilities for you to follow your dreams.": "So, why RoamerSoft? You choose to work with me if you want to follow your dreams, just like myself. Dreams can be big or small. A simple website to get your name out into the open or that mobile app which will change the world. I can create the possibilities for you to follow your dreams.",
      "My dream can be found at the bottom of this page. What is your dream?": "My dream can be found at the bottom of this page. What is your dream?",
      "Checkout My Dream": "Checkout My Dream",
      "The promise that I make to all my clients is that I deliver high quality products and services which are giving real value to the client’s main goal and that it makes no difference for whether the way of working or the results if I work remotely or on a specific location.": "The promise that I make to all my clients is that I deliver high quality products and services which are giving real value to the client’s main goal and that it makes no difference for whether the way of working or the results if I work remotely or on a specific location.",
      "Checkout My Working Method": "Checkout My Working Method",
      "About my": "About my",
      "Everything starts with a first introduction. Online, by using a video call. I travel a lot and I am staying all over the world and because of that I work only remote. With the use of the video call we can get to know each other a bit better. This is essential because it is important for me to understand what you precisely trying to accomplish. The next step is to figure out which possibilities we can use and which technique fits the best.": "Everything starts with a first introduction. Online, by using a video call. I travel a lot and I am staying all over the world and because of that I work only remote. With the use of the video call we can get to know each other a bit better. This is essential because it is important for me to understand what you precisely trying to accomplish. The next step is to figure out which possibilities we can use and which technique fits the best.",
      "We start working right away after we have figured out the plan in guidelines. We? Yes, you and me. Software development is teamwork and it is very unpredictable how the plans will work out. We cut the big project into smaller pieces and I start developing those with the highest value and priority first. I will create those pieces in short cycles of 2 weeks and we discuss the results and any improvements afterwards. After that, we can set the new priority for the next two weeks. We keep doing this cycle until the product has become the possibility which get you a step closer to your main goal.": "We start working right away after we have figured out the plan in guidelines. We? Yes, you and me. Software development is teamwork and it is very unpredictable how the plans will work out. We cut the big project into smaller pieces and I start developing those with the highest value and priority first. I will create those pieces in short cycles of 2 weeks and we discuss the results and any improvements afterwards. After that, we can set the new priority for the next two weeks. We keep doing this cycle until the product has become the possibility which get you a step closer to your main goal.",
      "I will make sure, with the right preparation and a clear structure, that our contact moments are fast and smooth. There is no need to spend hours of your time when it is not adding the highest possible value to the result.": "I will make sure, with the right preparation and a clear structure, that our contact moments are fast and smooth. There is no need to spend hours of your time when it is not adding the highest possible value to the result.",
      "Do you want to know more about my working method or do you have any other question? Please, feel free to contact me. I would be happy help.": "Do you want to know more about my working method or do you have any other question? Please, feel free to contact me. I would be happy help.",
      "Contact Me": "Contact Me",
      "Portfolio": "Portfolio",
      "en.html": "en.html",
      "StoryTemple Interaction App": "StoryTemple Interaction App",
      "Help Me Remind App": "Help Me Remind App",
      "IT-Toolkit Web Application": "IT-Toolkit Web Application",
      "Software Developer": "Software Developer",
      "Please feel free to contact me.": "Please feel free to contact me.",
      "About My": "About My",
      "Dream": "Dream",
      "Quite cold! Is what I say out loud while I am standing in the water to my hips. Come on Bas! You are standing here for ages, is what I am telling myself. What should those people think of me? 1, 2, 3… Splash! I dive into the water and take a couple of strokes. A feeling of freedom and happiness is rushing through my veins. I swim to the surface with a big smile on my face. I take in my famous sea star position and start floating on the salty sea. I hate my life, is what I am saying laughing loudly.": "Quite cold! Is what I say out loud while I am standing in the water to my hips. Come on Bas! You are standing here for ages, is what I am telling myself. What should those people think of me? 1, 2, 3… Splash! I dive into the water and take a couple of strokes. A feeling of freedom and happiness is rushing through my veins. I swim to the surface with a big smile on my face. I take in my famous sea star position and start floating on the salty sea. I hate my life, is what I am saying laughing loudly.",
      "My thoughts bring me back to the last 6 months. I have been working so hard on that mobile application for my client who lives in the Netherlands. I spent all my time and passion in this project, working fully remote from my apartment in Sydney, Australia. My client is happy as hell, the last invoice is paid and I am totally ready for the next adventure. Backpacking! This time I am going to New Zealand for 3 months and 3 months to the USA afterwards. I will end up in New York eventually and start working for 6 months again. I am going to be working on my own application this time which is standing in the top 10 of both the Apple App Store and the Google Play Store.": "My thoughts bring me back to the last 6 months. I have been working so hard on that mobile application for my client who lives in the Netherlands. I spent all my time and passion in this project, working fully remote from my apartment in Sydney, Australia. My client is happy as hell, the last invoice is paid and I am totally ready for the next adventure. Backpacking! This time I am going to New Zealand for 3 months and 3 months to the USA afterwards. I will end up in New York eventually and start working for 6 months again. I am going to be working on my own application this time which is standing in the top 10 of both the Apple App Store and the Google Play Store.",
      "Happily, I swim back to the beach. I see my friends standing ready with a couple of ice-cold beers. Yeah, this is my life. My life being a ‘Digital Nomad’!": "Happily, I swim back to the beach. I see my friends standing ready with a couple of ice-cold beers. Yeah, this is my life. My life being a ‘Digital Nomad’!",
      "The dream standing above developed through the years until what it is now. It went fast especially while I was studying. I learned what is really important in life and that there is no need to do what everybody else is doing. I learned which possibilities there are to accomplish my dream and after my study it was time to go for it.": "The dream standing above developed through the years until what it is now. It went fast especially while I was studying. I learned what is really important in life and that there is no need to do what everybody else is doing. I learned which possibilities there are to accomplish my dream and after my study it was time to go for it.",
      "I have chosen to combine my 2 biggest passions. Software development and traveling. Making applications with the newest technologies and creating possibilities for my clients with it. Making a difference in an organization with my technical solutions. Doing this while traveling, without having a final destination. Making the world my home, living as a": "I have chosen to combine my 2 biggest passions. Software development and traveling. Making applications with the newest technologies and creating possibilities for my clients with it. Making a difference in an organization with my technical solutions. Doing this while traveling, without having a final destination. Making the world my home, living as a",
      "Someone who likes to move around and travel, especially without a clear idea of what they want to do.": "Someone who likes to move around and travel, especially without a clear idea of what they want to do.",
      "With this thought, RoamerSoft was born!": "With this thought, RoamerSoft was born!",
      "Nowadays, I am proud to tell that I have helped multiple of my clients to mobile apps, advanced web applications, web shops and websites. Besides, I have seen a big part of Southeast Asia. I guess this is a nice start, right?": "Nowadays, I am proud to tell that I have helped multiple of my clients to mobile apps, advanced web applications, web shops and websites. Besides, I have seen a big part of Southeast Asia. I guess this is a nice start, right?",
      "RoamerSoft.com © 2020 All Rights Reserved.": "RoamerSoft.com © {{year}} All Rights Reserved.",
      "Working Worldwide Remotely": "Working Worldwide Remotely",
      "Privacy Disclaimer": "Privacy Disclaimer",
      "Terms and Conditions": "Terms and Conditions",
      "VAT ID:": "VAT ID:",
      "Chamber of Commerce No.:": "Chamber of Commerce No.:",
      "Enter your Name": "Enter your Name",
      "Enter your Email": "Enter your Email",
      "Enter your Message": "Enter your Message",
      "Send message": "Send message",
      "This website uses cookies to ensure you get the best experience.": "This website uses cookies to ensure you get the best experience.",
      "More info": "More info",
      "Got it!": "Got it!",
      "Your message is sent!": "Your message is sent!",
      "Email address is incorrect!": "Email address is incorrect!"
    };       
    return await this.connection.transaction(async manager => {
      await manager.save(nl);
      await manager.save(en);
      return await manager.find(Translation);
    });
  }
}

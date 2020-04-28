import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationsService } from '../../services/translations/translations.service';
import { Translation } from 'src/entities/translation.entity';
import { TranslationsController } from 'src/controllers/translations/translations.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Translation])],
    providers: [TranslationsService],
    controllers: [TranslationsController],
})
export class TranslationsModule {}

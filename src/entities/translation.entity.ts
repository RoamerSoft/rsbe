import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Translations')
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string;

  @Column('json')
  content;
}

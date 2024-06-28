import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'app_mobilidade_testes', name: 'tab_itinerario' })
export class Itinerario {
  @PrimaryGeneratedColumn({ name: 'iditinerario' })
  IdItinerario: number;

  @Column({ type: 'int', name: 'itidescritivo', nullable: true })
  ItinerarioDescritivo: number;

  @Column({ type: 'boolean', name: 'extensao', nullable: true })
  Extensao: string;

  @Column({ type: 'boolean', name: 'sentido', nullable: true })
  Sentido: Date;

  @Column({ type: 'boolean', name: 'geomitinerario', nullable: true })
  ItinerarioGeo: string;
}

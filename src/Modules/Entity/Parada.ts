import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'app_mobilidade_testes', name: 'tab_parada' })
export class Parada {
  @PrimaryGeneratedColumn({ name: 'idparada' })
  IdParada: number;

  @Column({ type: 'int', name: 'codparada', nullable: true })
  CodParada: number;

  @Column({ type: 'boolean', name: 'seq_linha', nullable: true })
  SeqLinha: string;

  @Column({ type: 'boolean', name: 'geomparada', nullable: true })
  GeomParada: Date;

  @Column({ type: 'boolean', name: 'latitude', nullable: true })
  Latitude: string;

  @Column({ type: 'boolean', name: 'longitude', nullable: true })
  Longitude: string;
}

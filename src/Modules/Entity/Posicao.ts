import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'app_mobilidade', name: 'staging_tab_posicao' })
export class Posicao {
  @PrimaryGeneratedColumn({ name: 'idposicao' })
  IdPosicao: number;
  @Column({ type: 'int', name: 'idlinha', nullable: true })
  IdLinha: number;
  @Column({ type: 'varchar', length: 20, name: 'prefixo', nullable: true })
  Prefixo: string;
  @Column({ type: 'timestamp', name: 'datalocal', nullable: true })
  DataLocal: Date;
  @Column({ type: 'varchar', length: 20, name: 'velocidade', nullable: true })
  Velocidade: string;
  @Column({ type: 'varchar', length: 20, name: 'codlinha', nullable: true })
  CodLinha: string;
  @Column({ type: 'varchar', length: 20, name: 'direcao', nullable: true })
  Direcao: string;
  @Column({ type: 'decimal', precision: 10, scale: 6, name: 'latitude', nullable: true })
  Latitude: number;
  @Column({ type: 'decimal', precision: 10, scale: 6, name: 'longitude', nullable: true })
  Longitude: number;
  @Column({ type: 'timestamp', name: 'dataregistro', nullable: true })
  DataRegistro: Date;
}

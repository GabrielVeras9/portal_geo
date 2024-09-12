import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity({ schema: 'dados_mobilidade', name: 'tab_posicao_geo' })
export class Posicao {
  @PrimaryGeneratedColumn({ name: 'id_posicao' })
  IdPosicao: number;

  @Column({ type: 'int', name: 'id_operadora', nullable: false })IdOperadora: number;
  @Column({ type: 'varchar', length: 14, name: 'prefixo', nullable: true })Prefixo: string;
  @Column({ type: 'timestamp', name: 'datalocal', nullable: true })DataLocal: Date;
  @Column({ type: 'varchar', length: 100, name: 'velocidade', nullable: true })Velocidade: number;
  @Column({ type: 'varchar', length: 10, name: 'cd_linha', nullable: true })CodLinha: string;
  @Column({ type: 'varchar', length: 20, name: 'direcao', nullable: true })Direcao: string;
  @Column({ type: 'float8', name: 'latitude', nullable: true })Latitude: number;
  @Column({ type: 'float8', name: 'longitude', nullable: true })Longitude: number;
}

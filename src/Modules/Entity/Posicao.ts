import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity({ schema: 'dados_mobilidade', name: 'tab_posicao' })
export class Posicao {
  @PrimaryGeneratedColumn({ name: 'id_posicao' })
  IdPosicao: number;

  @Column({ type: 'int', name: 'id_operadora', nullable: false })IdOperadora: number;
  @Column({ type: 'varchar', length: 14, name: 'prefixo', nullable: true })Prefixo: string;
  @Column({ type: 'timestamp', name: 'datalocal', nullable: true })DataLocal: Date;
  @Column({ type: 'numeric', precision: 8, scale: 4, name: 'velocidade', nullable: true })Velocidade: number;
  @Column({ type: 'varchar', length: 10, name: 'cd_linha', nullable: true })CodLinha: string;
  @Column({ type: 'varchar', length: 20, name: 'direcao', nullable: true })Direcao: string;
  @Column({ type: 'float8', name: 'latitude', nullable: true })Latitude: number;
  @Column({ type: 'float8', name: 'longitude', nullable: true })Longitude: number;
}

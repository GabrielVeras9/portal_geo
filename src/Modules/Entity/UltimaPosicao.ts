/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  
  @Entity({ schema: 'dados_mobilidade', name: 'tab_ultima_posicao' })
  export class UltimaPosicao {
      @PrimaryGeneratedColumn({ name: 'id_ultimaposicao' })
      id: number;
  
    @Column({ type: 'varchar', length: 20, nullable: true })prefixo: string;
    @Column({ type: 'varchar', length: 20, nullable: true })datalocal: string;
    @Column({ type: 'varchar', length: 15, nullable: true })velocidade: string;
    @Column({ type: 'varchar', length: 20, nullable: true })cd_linha: string;
    @Column({ type: 'float8', nullable: true })latitude: number;
    @Column({ type: 'float8', nullable: true })longitude: number;
    @Column({ type: 'int', nullable: true })id_linha: number;
    @Column({ type: 'varchar', length: 255, nullable: true })direcao: string;
  }
  
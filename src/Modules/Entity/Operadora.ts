/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dados_mobilidade', name: 'tab_operadora' })
export class OperadoraEntity {
    @PrimaryGeneratedColumn({ name: 'id_operadora' }) idOperadora: number;

@Column({ length: 200, nullable: true }) operadora: string;
@Column({ length: 20, nullable: true }) sigla: string;
@Column({ length: 7, nullable: true }) placa: string;
@Column({ length: 50, nullable: true }) modelo: string;
@Column({ length: 50, nullable: true }) marca: string;
@Column({ length: 50, nullable: true }) cor: string;
@Column({ length: 1, nullable: true }) tipo: string;
@Column('numeric', { precision: 4, nullable: true }) fabricacao: number;
@Column({ length: 8, nullable: true }) prefixo: string;
}

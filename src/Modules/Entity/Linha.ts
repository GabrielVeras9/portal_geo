/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dados_mobilidade', name: 'tab_linha' })
export class Linha {
    @PrimaryGeneratedColumn({ name: 'id_linha' }) IdLinha: number;

@Column({ type: 'text',    name: 'tx_linha' }) TxLinha: string;
@Column({ type: 'varchar', name: 'cd_linha', length: 10 }) CdLinha: string;
@Column({ type: 'decimal', name: 'vl_tarifa' }) ValorTarifa: string;
@Column({ type: 'decimal', name: 'fx_tarifaria' }) NomeTarifario: string;
}
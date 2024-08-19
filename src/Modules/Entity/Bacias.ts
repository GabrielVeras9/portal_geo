/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dados_mobilidade', name: 'tb_bacias' })
export class BaciasEntity {
    @PrimaryGeneratedColumn({ name: 'id_bacia' }) idBacia: number;

@Column({ type: 'varchar', name: 'nm_bacia', length: 50, nullable: true }) nmBacia?: string;
@Column({ type: 'varchar', name: 'sg_operadora', length: 50, nullable: true }) sgOperadora?: string;
@Column({ type: 'varchar', name: 'nm_operadora', length: 50, nullable: true }) nmOperadora?: string;
@Column({ type: 'date',    name: 'dt_inicio_permissao', nullable: true }) dtInicioPermissao?: Date;
@Column({ type: 'date',    name: 'dt_fim_permissao', nullable: true }) dtFimPermissao?: Date;
}
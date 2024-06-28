import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'app_mobilidade', name: 'staging_tab_operadora' })
export class Operadora {
  @PrimaryGeneratedColumn({ name: 'id_operadora' })
  IdOperadora: number;

  @Column({ type: 'text', name: 'nm_cpf_cnpj' })
  CnpjOperadora: string;

  @Column({ type: 'text', name: 'nm_operadora' })
  NomOperadora: string;
  
  @Column({ type: 'text', name: 'dt_registro' })
  DataRegistro: string;
}

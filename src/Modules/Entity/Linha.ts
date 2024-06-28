import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'app_mobilidade', name: 'staging_tab_linha' })
export class Linha {
  @PrimaryGeneratedColumn({ name: 'id_linha' })
  IdLinha: number;
  @Column({ type: 'varchar', length: 10, name: 'cd_linha' })
  CdLinha: string;
  @Column({ type: 'text', name: 'tx_linha' })
  TxLinha: string;
}

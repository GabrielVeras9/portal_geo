import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'app_mobilidade', name: 'staging_tab_veiculo' })
export class Veiculo {
  @PrimaryGeneratedColumn({ name: 'idveiculo' })
  IdVeiculo: number;

  @Column({ type: 'text', name: 'placaveiculo' })
  PlacaVeiculo: string;

  @Column({ type: 'text', name: 'prefixo' })
  Prefixo: string;
  
  @Column({ type: 'text', name: 'anofabricacao' })
  AnoFabricacao: string;

  @Column({ type: 'text', name: 'modelo' })
  Modelo: string;
}

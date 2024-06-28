import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'app_mobilidade_testes', name: 'tab_horaria' })
export class Horaria {
  @PrimaryGeneratedColumn({ name: 'idhorario' })
  IdHoraria: number;
  @Column({ type: 'int', name: 'horapartida', nullable: true })
  HoraPartida: number;
  @Column({ type: 'boolean', name: 'tipoveiculo', nullable: true })
  TipoVeiculo: string;
  @Column({ type: 'boolean', name: 'domingo', nullable: true })
  Domigo: Date;
  @Column({ type: 'boolean', name: 'segunda', nullable: true })
  Segunda: string;
  @Column({ type: 'boolean', name: 'terca', nullable: true })
  Terca: string;
  @Column({ type: 'boolean', name: 'quarta', nullable: true })
  Quarta: string;
  @Column({ type: 'boolean', name: 'quinta', nullable: true })
  Quinta: number;
  @Column({ type: 'boolean', name: 'sexta', nullable: true })
  Sexta: number;
  @Column({ type: 'boolean', name: 'sabado', nullable: true })
  Sabado: Date;
}

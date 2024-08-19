/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'dados_mobilidade', name: 'tab_itineraro_descritivo' })
export class Itinerario {
    @PrimaryColumn({ name: 'id_itinerario' })
    idItinerario: number;

    @Column({ type: 'int', name: 'id_linha' })
    idLinha: number;

    @Column({ type: 'varchar', name: 'nm_via', length: 120 })
    nmVia: string;

    @Column({ type: 'numeric', precision: 6, scale: 2, name: 'lin_extensao' })
    linExtensao: number;

    @Column({ type: 'varchar', name: 'lin_sentido', length: 10 })
    linSentido: string;

    @Column({ type: 'numeric', precision: 5, nullable: true, name: 'nm_sequencia' })
    nmSequencia: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'dataregistro' })
    dataRegistro: Date;
}

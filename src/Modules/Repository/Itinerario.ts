/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ItinerarioRepository {
    constructor(private readonly dataSource: DataSource) {}
    async findItinerarioDescritivoByCodigo(codigoLinha: string) {
        const query = `select jsonb_build_object('dados', jsonb_build_object('codigo', tl.cd_linha, 'tarifa', tl.vl_tarifa,'extensão', ti.lin_extensao,'sentido', ti.lin_sentido),'itinerario', jsonb_agg(jsonb_build_object('sequencia', tid.nm_sequencia, 'via', tid.nm_via ) ORDER BY tid.nm_sequencia )) AS itinerario_descritivo from dados_mobilidade.tab_linha tl, dados_mobilidade.tab_itinerario ti, dados_mobilidade.tab_itinerario_descritivo tid where tl.id_linha = ti.id_linha and ti.id_itinerario = tid.id_itinerario and tl.cd_linha = $1 GROUP by tl.cd_linha,tl.tx_linha,tl.vl_tarifa,ti.lin_extensao,ti.lin_sentido;`;
        return this.dataSource.query(query, [codigoLinha]);
    }
}

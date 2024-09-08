/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { formatItinerarioResponse } from '../utils/DescritivoJson';

@Injectable()
export class ItinerarioRepository {
    constructor(private readonly dataSource: DataSource) { }
/**
 * 
 * @param codigoLinha
 * @returns
 */
async findItinerarioByCodigo(codigoLinha: string) {
    const query = `
        SELECT
            FIRST_VALUE(TID.nm_via) OVER (PARTITION BY tl.cd_linha, ti.lin_sentido ORDER BY tid.nm_sequencia ASC) AS origem,
            FIRST_VALUE(TID.nm_via) OVER (PARTITION BY tl.cd_linha, ti.lin_sentido ORDER BY tid.nm_sequencia DESC) AS destino,
            tl.cd_linha,
            TI.lin_sentido AS sentido,
            TI.lin_extensao AS extensao,
            TID.nm_sequencia,
            TID.nm_via,
            TID.localidade
        FROM
            dados_mobilidade.tab_linha tl
            JOIN dados_mobilidade.tab_itinerario ti ON TL.id_linha = TI.id_linha
            JOIN dados_mobilidade.tab_itinerario_descritivo tid ON TI.id_itinerario = TID.id_itinerario
        WHERE
            TL.cd_linha = $1
        GROUP BY
            tid.nm_via,
            tl.cd_linha,
            TI.lin_sentido,
            TID.nm_sequencia,
            TI.lin_extensao,
            TID.localidade
        ORDER BY
            ti.lin_sentido,
            tid.nm_sequencia;`;
    const result = await this.dataSource.query(query, [codigoLinha]);
    if (!result || result.length === 0) {
        throw new NotFoundException('Itinerário não encontrado.');
    }
    return formatItinerarioResponse(result);
}

/**
 * 
 * @param codigoLinha 
 * @param sentido 
 * @returns 
 */
async findSentidoItinerarioByCodigo(codigoLinha: string, sentido: string) {
    const query = `
        SELECT
            tl.cd_linha,
            TI.lin_sentido AS sentido,
            TI.lin_extensao AS extensao,
            FIRST_VALUE(TID.nm_via) OVER (PARTITION BY tl.cd_linha, ti.lin_sentido ORDER BY tid.nm_sequencia ASC) AS origem,
            FIRST_VALUE(TID.nm_via) OVER (PARTITION BY tl.cd_linha, ti.lin_sentido ORDER BY tid.nm_sequencia DESC) AS destino,
            TID.nm_sequencia,
            TID.nm_via,
            TID.localidade
        FROM
            dados_mobilidade.tab_linha tl
            JOIN dados_mobilidade.tab_itinerario ti ON TL.id_linha = TI.id_linha
            JOIN dados_mobilidade.tab_itinerario_descritivo tid ON TI.id_itinerario = TID.id_itinerario
        WHERE
            TL.cd_linha = $1 AND
            LOWER(ti.lin_sentido) = LOWER($2)
        ORDER BY
            ti.lin_sentido,
            tid.nm_sequencia;
    `;
    const result = await this.dataSource.query(query, [codigoLinha, sentido]);
    if (!result || result.length === 0) {
        throw new NotFoundException('Itinerário não encontrado.');
    }
    return formatItinerarioResponse(result);
    }
}

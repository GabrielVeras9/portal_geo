/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class LinhaRepository {
    constructor(private readonly dataSource: DataSource) { }

    /**
     *
     * @returns
     */
    async getFindAll() {
        const query = `
        select 
            to2.id_operadora,
            to2.nm_operadora as operadora, 
            tl.cd_linha as numero,
            ti.lin_sentido as sentido,
            tl.tx_linha as descricao,
            tl.vl_tarifa as tarifa,
            tl.fx_tarifaria as FaixaTarifaria
        from
            dados_mobilidade.tab_linha tl,
            dados_mobilidade.tab_operadora to2,
            dados_mobilidade.tab_operadora_linha tol,
            dados_mobilidade.tab_itinerario ti
        where
            tl.id_linha = tol.id_linha and
            tol.id_operadora = to2.id_operadora and
            tl.id_linha = ti.id_linha
        order by
            tl.cd_linha;`;
        return this.dataSource.query(query);
    }
    
    /**
     *
     * @param cd_linha
     * @returns
     */
    async getFindNumeroLinha(cd_linha: string) {
        const query = `
        select 
            to2.id_operadora,
            to2.nm_operadora as operadora, 
            tl.cd_linha as numero,
            ti.lin_sentido as sentido,
            tl.tx_linha as descricao,
            tl.vl_tarifa as tarifa,
            tl.fx_tarifaria as FaixaTarifaria
        from
            dados_mobilidade.tab_linha tl,
            dados_mobilidade.tab_operadora to2,
            dados_mobilidade.tab_operadora_linha tol,
            dados_mobilidade.tab_itinerario ti
        where
            tl.id_linha = tol.id_linha and
            tol.id_operadora = to2.id_operadora and
            tl.id_linha = ti.id_linha and
            tl.cd_linha = $1;`;
        return this.dataSource.query(query, [cd_linha]);
    }
    
    /**
 * @param cd_linha
 * @param limit
 * @returns 
 */
async getFindLinha(cd_linha: string, limit: bigint) {
    const query = `
    SELECT 
        to2.id_operadora,
        to2.nm_operadora AS operadora, 
        tl.cd_linha AS numero,
        ti.lin_sentido AS sentido,
        tl.tx_linha AS descricao,
        tl.vl_tarifa AS tarifa,
        tl.fx_tarifaria AS FaixaTarifaria
    FROM
        dados_mobilidade.tab_linha tl
        JOIN dados_mobilidade.tab_operadora_linha tol ON tl.id_linha = tol.id_linha
        JOIN dados_mobilidade.tab_operadora to2 ON tol.id_operadora = to2.id_operadora
        JOIN dados_mobilidade.tab_itinerario ti ON tl.id_linha = ti.id_linha
    WHERE
        (tl.cd_linha::text ILIKE '%' || $1 || '%' OR 
        unaccent(LOWER(tl.tx_linha)) ILIKE '%' || unaccent(LOWER($1)) || '%')
    ORDER BY
        tl.cd_linha
    LIMIT $2::bigint;`;
    
    // Aqui você passa os dois parâmetros: cd_linha e limit
    return this.dataSource.query(query, [cd_linha, limit]);
}
    
    /**
     * @param cd_linha
     * @returns 
     */
    async getShortLinha(cd_linha: string, limit: bigint) {
        const query = `
        SELECT 
            tl.cd_linha AS numero,
            tl.tx_linha AS descricao,
            tl.vl_tarifa AS tarifa,
            ti.lin_sentido as sentido
	        FROM
	            dados_mobilidade.tab_linha tl,
	            dados_mobilidade.tab_itinerario ti
	        WHERE	
	        	tl.id_linha = ti.id_linha and
	            tl.cd_linha::text ILIKE '%' || $1 || '%' OR unaccent(LOWER(tl.tx_linha)) ILIKE '%' || unaccent(LOWER($1)) || '%'
	        order by
	            tl.cd_linha
	        limit $2::bigint;`;
        return this.dataSource.query(query, [cd_linha, limit]);
    }
}

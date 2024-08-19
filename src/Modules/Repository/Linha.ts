/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class LinhaRepository {
    constructor(private readonly dataSource: DataSource) {}

    async getFindNumber(cd_linha: string) {
        const query = `SELECT json_agg(json_build_object('Codigo', tl.cd_linha,'tarifa', tl.vl_tarifa,'Faixatarifaria', tl.fx_tarifaria,'Operadora', to2.nm_operadora,'Denominacao', tl.tx_linha)) AS LinhaOperadora from dados_mobilidade.tab_linha tl,dados_mobilidade.tab_operadora_linha tol,dados_mobilidade.tab_operadora to2 WHERE tl.id_linha = tol.id_linha and tol.id_operadora = to2.id_operadora and tl.cd_linha = $1;`;
        return this.dataSource.query(query, [cd_linha]);
    }

    async getFindAll() {
        const query = `select jsonb_agg(jsonb_build_object('codigo',tl.cd_linha,'denominacao',tl.tx_linha,'tarifa',tl.vl_tarifa,'faixa-tarifaria',tl.fx_tarifaria,'operadora',to2.nm_operadora)) as dados from dados_mobilidade.tab_linha tl, dados_mobilidade.tab_operadora_linha tol, dados_mobilidade.tab_operadora to2 where tl.id_linha = tol.id_linha and tol.id_operadora = to2.id_operadora;`;
        return this.dataSource.query(query);
    }
}

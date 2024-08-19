/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UltimaPosicaoRepository {
    constructor(private readonly dataSource: DataSource) {}

    async findPiracicabana() {
        const query = `select jsonb_agg(jsonb_build_object('operadora',to2.nm_operadora,'prefixo',tup.prefixo,'datalocal',tup.datalocal,'velocidade',tup.velocidade,'codigo',tup.cd_linha,'direcao',tup.direcao,'latitude',tup.latitude,'longitude',tup.longitude) order by tup.cd_linha desc) as operadora from dados_mobilidade.tab_operadora to2, dados_mobilidade.tab_ultima_posicao tup where to2.id_operadora = tup.id_operadora and to2.nm_operadora = 'VIAÇÃO PIRACICABANA - BACIA 01';`;
        return this.dataSource.query(query);
    }

    async findPioneira() {
        const query = `select jsonb_agg(jsonb_build_object('operadora',to2.nm_operadora,'prefixo',tup.prefixo,'datalocal',tup.datalocal,'velocidade',tup.velocidade,'codigo',tup.cd_linha,'direcao',tup.direcao,'latitude',tup.latitude,'longitude',tup.longitude) order by tup.cd_linha desc) as operadora from dados_mobilidade.tab_operadora to2,dados_mobilidade.tab_ultima_posicao tup where to2.id_operadora = tup.id_operadora and to2.nm_operadora = 'VIAÇÃO PIONEIRA BACIA - 02';`;
        return this.dataSource.query(query);
    }

    async findUrbi() {
        const query = `select jsonb_agg(jsonb_build_object('operadora',to2.nm_operadora,'prefixo',tup.prefixo,'datalocal',tup.datalocal,'velocidade',tup.velocidade,'codigo',tup.cd_linha,'direcao',tup.direcao,'latitude',tup.latitude,'longitude',tup.longitude) order by tup.cd_linha desc) as operadora from dados_mobilidade.tab_operadora to2,dados_mobilidade.tab_ultima_posicao tup where to2.id_operadora = tup.id_operadora and to2.nm_operadora = 'URBI - MOBILID. URBANA - BACIA 03';`;
        return this.dataSource.query(query);
    }

    async findMarechal() {
        const query = `select jsonb_agg(jsonb_build_object('operadora',to2.nm_operadora,'prefixo',tup.prefixo,'datalocal',tup.datalocal,'velocidade',tup.velocidade,'codigo',tup.cd_linha,'direcao',tup.direcao,'latitude',tup.latitude,'longitude',tup.longitude) order by tup.cd_linha desc) as operadora from dados_mobilidade.tab_operadora to2,dados_mobilidade.tab_ultima_posicao tup where to2.id_operadora = tup.id_operadora and to2.nm_operadora = 'AUTO VIAÇÃO MARECHAL - BACIA 04';`;
        return this.dataSource.query(query);
    }

    async findSaoJose() {
        const query = `select jsonb_agg(jsonb_build_object('operadora',to2.nm_operadora,'prefixo',tup.prefixo,'datalocal',tup.datalocal,'velocidade',tup.velocidade,'codigo',tup.cd_linha,'direcao',tup.direcao,'latitude',tup.latitude,'longitude',tup.longitude) order by tup.cd_linha desc) as operadora from dados_mobilidade.tab_operadora to2,dados_mobilidade.tab_ultima_posicao tup where to2.id_operadora = tup.id_operadora and to2.nm_operadora = 'EXPRESSO SÃO JOSÉ BACIA - 05';`;
        return this.dataSource.query(query);
    }

	async findPositioLinhaNumber(cd_linha: string) {
        const query = `select jsonb_agg(jsonb_build_object('operadora',to2.nm_operadora,'prefixo',tup.prefixo,'data',tup.datalocal,'velocidade',tup.velocidade,'codigo',tup.cd_linha,'direcao',tup.direcao,'latitude',tup.latitude,'longitude',tup.longitude,'dataregistro ',tup.dataregistro) order by tup.cd_linha desc) as operacao from dados_mobilidade.tab_operadora to2,dados_mobilidade.tab_ultima_posicao tup where to2.id_operadora = tup.id_operadora and (tup.prefixo = $1 OR tup.cd_linha = $1);`;
        return this.dataSource.query(query, [cd_linha]);
    }
}

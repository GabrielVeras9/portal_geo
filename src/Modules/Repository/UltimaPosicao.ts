/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { formatPosicao } from '../utils/PosicaoJson';
import { UltimaPosicao } from '../Entity/UltimaPosicao';

@Injectable()
export class UltimaPosicaoRepository {
    constructor(private readonly dataSource: DataSource) { }
    
   /**
     * Ativa a função para pesquisar todas as posições de linhas
     * @returns {Promise<UltimaPosicao[]>}
     */
   async getFindAllOperadorasPosicoes(): Promise<UltimaPosicao[]> {
    const query = `
    SELECT 
        TO2.nm_operadora,
        tup.cd_linha as numero,
        tup.prefixo,
        tup.datalocal,
        tup.velocidade, 
        tup.direcao,
        tup.latitude,
        tup.longitude
    FROM 
        dados_mobilidade.tab_ultima_posicao tup
    JOIN 
        dados_mobilidade.tab_operadora to2 ON to2.id_operadora = tup.id_operadora
    ORDER BY
        TO2.nm_operadora;`;

    const result = await this.dataSource.query(query);
    return formatPosicao(result) as UltimaPosicao[];
}

    /**
     * Responsavel por ativar a function do banco de dados e realizar a pesquisa
     * @returns
     */
    async findPiracicabana() {
        const query = `
        select 
            TO2.nm_operadora,
            tup.cd_linha as numero,
            tup.prefixo,
            tup.datalocal,
            tup.velocidade, 
            tup.direcao,
            tup.latitude,
            tup.longitude
        from 
            dados_mobilidade.tab_ultima_posicao tup,
            dados_mobilidade.tab_operadora to2
        where
            to2.id_operadora = tup.id_operadora and
            to2.nm_operadora = 'VIAÇÃO PIRACICABANA - BACIA 01'
        order by
            TO2.nm_operadora;`;
            
        const result = await this.dataSource.query(query);
        return formatPosicao(result) as UltimaPosicao[];
    }

    /**
     * Responsavel por ativar a function do banco de dados e realizar a pesquisa
     * @returns
     */
    async findPioneira() {
        const query = `
        select 
            TO2.nm_operadora,
            tup.cd_linha as numero,
            tup.prefixo,
            tup.datalocal,
            tup.velocidade, 
            tup.direcao,
            tup.latitude,
            tup.longitude
        from 
            dados_mobilidade.tab_ultima_posicao tup,
            dados_mobilidade.tab_operadora to2
        where
            to2.id_operadora = tup.id_operadora and
            to2.nm_operadora = 'VIAÇÃO PIONEIRA BACIA - 02'
        order by
            TO2.nm_operadora;`;
        const result = await this.dataSource.query(query);
        return formatPosicao(result) as UltimaPosicao[];
    }

    /**
     * Responsavel por ativar a function do banco de dados e realizar a pesquisa
     * @returns
     */
    async findUrbi() {
        const query = `
        select 
            TO2.nm_operadora,
            tup.cd_linha as numero,
            tup.prefixo,
            tup.datalocal,
            tup.velocidade, 
            tup.direcao,
            tup.latitude,
            tup.longitude
        from 
            dados_mobilidade.tab_ultima_posicao tup,
            dados_mobilidade.tab_operadora to2
        where
            to2.id_operadora = tup.id_operadora and
            to2.nm_operadora = 'URBI - MOBILID. URBANA - BACIA 03'
        order by
            TO2.nm_operadora;`;
        const result = await this.dataSource.query(query);
        return formatPosicao(result) as UltimaPosicao[];
    }

    /**
     * Responsavel por ativar a function do banco de dados e realizar a pesquisa
     * @returns
     */
    async findMarechal() {
        const query = `
        select 
            TO2.nm_operadora,
            tup.cd_linha as numero,
            tup.prefixo,
            tup.datalocal,
            tup.velocidade, 
            tup.direcao,
            tup.latitude,
            tup.longitude
        from 
            dados_mobilidade.tab_ultima_posicao tup,
            dados_mobilidade.tab_operadora to2
        where
            to2.id_operadora = tup.id_operadora and
            to2.nm_operadora = 'AUTO VIAÇÃO MARECHAL - BACIA 04'
        order by
            TO2.nm_operadora;`;
        const result = await this.dataSource.query(query);
        return formatPosicao(result) as UltimaPosicao[];
    }

    /**
     * Responsavel por ativar a function do banco de dados e realizar a pesquisa
     * @returns
     */
    async findSaoJose() {
        const query = `
        select 
            TO2.nm_operadora,
            tup.cd_linha as numero,
            tup.prefixo,
            tup.datalocal,
            tup.velocidade, 
            tup.direcao,
            tup.latitude,
            tup.longitude
        from 
            dados_mobilidade.tab_ultima_posicao tup,
            dados_mobilidade.tab_operadora to2
        where
            to2.id_operadora = tup.id_operadora and
            to2.nm_operadora = 'EXPRESSO SÃO JOSÉ BACIA - 05'
        order by
            TO2.nm_operadora;`;
        const result = await this.dataSource.query(query);
        return formatPosicao(result) as UltimaPosicao[];
    }

    /**
     * Responsavel por ativar a function do banco de dados e realizar a pesquisa
     * @param cd_linha
     * @returns
     */
	async findPositioLinhaNumber(cd_linha: string) {
        const query = `select * from dados_mobilidade.gps_linha_recent($1);`;
        return this.dataSource.query(query, [cd_linha]);
    }
}

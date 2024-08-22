/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UltimaPosicaoRepository {
    constructor(private readonly dataSource: DataSource) { }
    /**
     * ativa a function para pesquisar todas as posicoes de linhas
     * @returns
     */
    async getFindAllOperadorasPosicoes() {
        const query = `select * from dados_mobilidade.get_operadoras_posicoes();`;
        return this.dataSource.query(query);
    }

    /**
     * Responsavel por ativar a function do banco de dados e realizar a pesquisa
     * @returns
     */
    async findPiracicabana() {
        const query = `select * from dados_mobilidade.gps_operadora_recent('VIAÇÃO PIRACICABANA - BACIA 01');`;
        return this.dataSource.query(query);
    }

    /**
     * Responsavel por ativar a function do banco de dados e realizar a pesquisa
     * @returns
     */
    async findPioneira() {
        const query = `select * from dados_mobilidade.gps_operadora_recent('VIAÇÃO PIONEIRA BACIA - 02');`;
        return this.dataSource.query(query);
    }

    /**
     * Responsavel por ativar a function do banco de dados e realizar a pesquisa
     * @returns
     */
    async findUrbi() {
        const query = `select * from dados_mobilidade.gps_operadora_recent('URBI - MOBILID. URBANA - BACIA 03');`;
        return this.dataSource.query(query);
    }

    /**
     * Responsavel por ativar a function do banco de dados e realizar a pesquisa
     * @returns
     */
    async findMarechal() {
        const query = `select * from dados_mobilidade.gps_operadora_recent('AUTO VIAÇÃO MARECHAL - BACIA 04');`;
        return this.dataSource.query(query);
    }

    /**
     * Responsavel por ativar a function do banco de dados e realizar a pesquisa
     * @returns
     */
    async findSaoJose() {
        const query = `select * from dados_mobilidade.gps_operadora_recent('EXPRESSO SÃO JOSÉ BACIA - 05');`;
        return this.dataSource.query(query);
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

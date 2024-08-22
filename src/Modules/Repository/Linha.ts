/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class LinhaRepository {
    constructor(private readonly dataSource: DataSource) { }
    /**
     * Ativa a function para pesquisar linhas por operadoras
     * @param cd_linha
     * @returns
     */
    async getFindNumber(cd_linha: string) {
        const query = `select * from dados_mobilidade.get_linha_operadora($1);`;
        return this.dataSource.query(query, [cd_linha]);
    }
    /**
     * Ativa a function para pesquisar todas as linhas
     * @returns
     */
    async getFindAll() {
        const query = `select * from dados_mobilidade.get_dados_linha_operadora();`;
        return this.dataSource.query(query);
    }
}

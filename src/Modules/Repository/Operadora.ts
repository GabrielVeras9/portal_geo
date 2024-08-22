/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class OperadoraRepository {
    constructor(private readonly dataSource: DataSource) {}
    /**
     * ativa a function para pesquisar todos os veiculos de todas as operadoras
     * @returns
     */
    async findAll() {
        const query = `select * from dados_mobilidade.get_operadoras_veiculos();`;
        return this.dataSource.query(query);
    }
    /**
     * ativa a function para filtrar todos os veiculos de apenas uma operadoras
     * @param operadora
     * @returns
     */
    async findOperadorasByOperadoraName(operadora: string) {
        const query = `select * from dados_mobilidade.get_operadoras_veiculos_filtrados($1);`;
        return this.dataSource.query(query, [operadora]);
    }
}

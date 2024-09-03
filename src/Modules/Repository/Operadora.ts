/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class OperadoraRepository {
    constructor(private readonly dataSource: DataSource) {}
    /**
     *
     * @returns
     */
    async findAll() {
        const query = `select * from dados_mobilidade.get_operadoras_veiculos();`;
        return this.dataSource.query(query);
    }
    /**
     *
     * @param operadora
     * @returns
     */
    async findOperadorasByOperadoraName(operadora: string) {
        const query = `select * from dados_mobilidade.get_operadoras_veiculos_filtrados($1);`;
        return this.dataSource.query(query, [operadora]);
    }
}

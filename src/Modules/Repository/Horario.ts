/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HorariosRepository {
    constructor(private readonly dataSource: DataSource) {}
    /**
     * Ativa a function do banco de dados para pesquisar as tabelas horarias
     * @param codigoLinha
     * @returns
     */
    async findTabHorario(codigoLinha: string) {
        const query = `select * from dados_mobilidade.get_tabela_horaria($1);`;
        return this.dataSource.query(query, [codigoLinha]);
    }
}

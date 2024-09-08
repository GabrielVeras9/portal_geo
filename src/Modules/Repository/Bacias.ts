/* eslint-disable prettier/prettier */
// src/Modules/Repository/operadora.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class BaciasRepository {
    constructor(private readonly dataSource: DataSource) {}
    
    /**
     * Ativa a function do banco para pesquisar as bacias
     * @returns
     */
    async findAll() {
        const query = `select * from dados_mobilidade.bacias_operadoras();`;
        return this.dataSource.query(query);
    }
}

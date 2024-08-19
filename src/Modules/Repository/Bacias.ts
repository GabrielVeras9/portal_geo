/* eslint-disable prettier/prettier */
// src/Modules/Repository/operadora.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class BaciasRepository {
    constructor(private readonly dataSource: DataSource) {}
    async findAll() {
        const query = `select jsonb_agg(json_build_object('sigla-bacia', b.id_bacia,'nome-operadora', b.nm_operadora,'nome-bacia', b.nm_bacia,'inicio-permissao', b.dt_inicio_permissao,'fim-permissao', b.dt_fim_permissao)) as bacias FROM dados_mobilidade.tb_bacias b;`;
        return this.dataSource.query(query);
    }
}

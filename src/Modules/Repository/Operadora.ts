/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class OperadoraRepository {
    constructor(private readonly dataSource: DataSource) {}

    async findAll() {
        const query = `SELECT json_agg(json_build_object('operadora', te.nm_operadora,'veiculos', (SELECT json_agg(json_build_object('placa', veic.placa,'modelo', veic.modelo,'marca', veic.marca,'cor', veic.cor,'tipo', veic.tipo,'fabricacao', veic.fabricacao,'prefixo', veic.prefixo ))FROM dados_mobilidade.tab_veiculo veic WHERE veic.id_operadora = te.id_operadora))) AS Operadoras FROM (SELECT DISTINCT id_operadora, nm_operadora FROM dados_mobilidade.tab_operadora ) AS te;`;
        return this.dataSource.query(query);
    }

    async findOperadorasByOperadoraName(operadora: string) {
        const query = `SELECT json_build_object('operadora', op.nm_operadora,'veiculos', json_agg(json_build_object('sigla', op.nm_operadora,'placa', veic.placa,'modelo', veic.modelo,'marca', veic.marca,'cor', veic.cor,'tipo', veic.tipo,'fabricacao', veic.fabricacao,'prefixo', veic.prefixo))) AS Operadoras FROM dados_mobilidade.tab_operadora op JOIN dados_mobilidade.tab_veiculo veic ON op.id_operadora = veic.id_operadora WHERE UPPER(op.nm_operadora) LIKE '%' || UPPER($1) || '%' GROUP BY op.nm_operadora;
`;
        return this.dataSource.query(query, [operadora]);
    }
}
